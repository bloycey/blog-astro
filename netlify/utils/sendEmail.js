require('dotenv').config()
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const buildParams = (emailTitle, emailContent) => ({
	Destination: { /* required */
		CcAddresses: [],
		ToAddresses: [
			"bloyce1990@gmail.com",
		]
	},
	Message: { /* required */
		Body: { /* required */
			Html: {
				Charset: "UTF-8",
				Data: emailContent
			},
			Text: {
				Charset: "UTF-8",
				Data: ""
			}
		},
		Subject: {
			Charset: 'UTF-8',
			Data: emailTitle
		}
	},
	Source: 'Bloycey Blog <andrew@bloycey.blog>', /* required */
	ReplyToAddresses: [
		'bloyce1990@gmail.com',
	],
})

const buildSendPromise = (emailTitle, emailContent) => () => new AWS.SES({ apiVersion: '2010-12-01', accessKeyId: process.env.AWS_ACCESS_KEY_ID_ASTRO, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ASTRO }).sendEmail(buildParams(emailTitle, emailContent)).promise();

export default buildSendPromise;
