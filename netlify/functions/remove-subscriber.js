import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { createClient } from '@supabase/supabase-js'
import buildSendPromise from '../utils/sendEmail'

dotenv.config()

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.DATABASE, process.env.DATABASE_KEY)

export const handler = async (event, context) => {
	const { email } = JSON.parse(event.body)

	const { data, error } = await supabase
		.from('subscribers')
		.delete()
		.eq('email', email)

	const sendPromise = buildSendPromise("👋 Unsubscribe Alert", `Subscriber Removed: ${email}`);
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