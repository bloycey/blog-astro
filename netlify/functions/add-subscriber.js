import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { createClient } from '@supabase/supabase-js'
import sendEmail from '../utils/sendEmail'

dotenv.config()

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.DATABASE, process.env.DATABASE_KEY)

export const handler = async (event, context) => {
	const { email, name, last_name } = JSON.parse(event.body)

	if (last_name) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				status: 500,
				message: 'Honeypot triggered',
			}),
		}
	}

	const { data, error } = await supabase
		.from('subscribers')
		.insert({ email, name })

	await sendEmail({
		emailTitle: `🎉 New Subscriber: ${name}`,
		emailContent: `New Subscriber: ${name} - ${email}`
	});


	return {
		statusCode: 200,
		body: JSON.stringify({
			status: 200,
			message: data,
			error: error
		}),
	}
}