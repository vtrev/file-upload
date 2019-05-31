// "use strict";
const express = require('express');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');
const app = express();
const image2base64 = require('image-to-base64');

app.use(express.static("./client/dist"));
app.use(fileUpload());


app.post('/api/uploadQuizAttachment', function (req, res) {

	let quizAttachment = req.files.quizAttachment;

	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('no image uploaded');
	}

	if (!quizAttachment.mimetype.startsWith('image')) {
		return res.status(400).send('invalid image type');
	}

	let generateFileName = (params) => {
		return (params.studentName + "-" + params.quizId + ".png").trim();
	}

	let fileName = generateFileName({
		studentName: 'vusi',
		quizId: '001'
	});

	sharp(quizAttachment.data).resize({
			width: 1024
		})
		.toFile(`./quizattachments/${fileName}`, (err, info) => {
			if (!err) {
				image2base64(`./quizattachments/${fileName}`)
					.then(
						(response) => {
						res.send({base64img:response}); 						}
					)
					.catch(
						(error) => {
							console.log(error);
						}
					)
			} else
				res.send('Error while trying to save file');
		});
});

const PORT = process.env.PORT || 5656;

app.listen(PORT, () => {
	console.log(`Upload app running on :  ${PORT}`);
});