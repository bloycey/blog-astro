require('dotenv').config()
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const sendEmail = async ({ emailTitle, emailContent }) => {
	const params = {
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
	};
	const sendPromise = new AWS.SES({ apiVersion: '2010-12-01', accessKeyId: process.env.AWS_ACCESS_KEY_ID_ASTRO, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ASTRO }).sendEmail(params).promise();

	sendPromise.then(function (data) {
		if (data) {
			console.log(data);
			console.log(data.MessageId);
		}
	}).catch(function (err) {
		console.error(err, err.stack);
	});
}

export default sendEmail;
