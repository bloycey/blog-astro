import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { createClient } from '@supabase/supabase-js'

dotenv.config()

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.DATABASE, process.env.DATABASE_KEY)

export const handler = async (event, context) => {
	const id = event.queryStringParameters.id;

	const { data, error } = await supabase
		.from('comments')
		.select()
		.eq('blog_id', id)

	return {
		statusCode: 200,
		body: JSON.stringify({
			status: 200,
			message: data,
			error: error
		}),
	}
}
