import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import buildSendPromise from '../utils/sendEmail'
const rateLimit = require("lambda-rate-limiter")({
	interval: 60 * 1000 // Our rate-limit interval, one minute
}).check;
const sanitizer = require('sanitize')();

dotenv.config()

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.DATABASE, process.env.DATABASE_KEY)

export const handler = async (event, context) => {
	const { name, comment, blog_id, last_name, blog_url } = JSON.parse(event.body)
	try {
		// 10 stands for the maximum amount of requests allowed during the defined interval
		// rateLimit now returns a promise, let's await for it! (◕‿◕✿)
		await rateLimit(2, event.headers["client-ip"]);
	} catch (error) {
		console.log("slow down! Too many requests!")
		return {
			statusCode: 429,
			body: JSON.stringify({
				status: 429,
				message: 'Too Many Requests',
			}),
		}; // Still returning a basic 429, but we could do anything ~
	}
	if (last_name) {
		return {
			statusCode: 200,
			body: JSON.stringify({
				status: 200,
				message: 'Honeypot triggered',
			}),
		}
	}

	const sanitisedContent = sanitizer.primitives({ name, comment })

	const { data, error } = await supabase
		.from('comments')
		.insert({ name: sanitisedContent.name, comment: sanitisedContent.comment, blog_id })
		.select()

	const sendPromise = buildSendPromise(`🎉 New Blog Comment: ${name}`, `New Blog Comment: ${name} - ${blog_url} - ${comment}`);
	await sendPromise();

	return {
		statusCode: 200,
		body: JSON.stringify({
			status: 200,
			message: data,
			error: error
		}),
	}
}