// "use strict";
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const image2base64 = require('image-to-base64');
const {
	Image
} = require('image-js');

app.use(express.static("./client/dist"));
app.use(fileUpload());


app.post('/api/uploadQuizAttachment', function (req, res) {

	if (req.files == null) {
		console.log('No image uploaded')
		return res.send({error:'No image uploaded'});
	}
	let quizAttachment = req.files.quizAttachment;

	if (!quizAttachment.mimetype.startsWith('image')) {
		console.log('Invalid image type')
		return res.send({error:'Invalid image type'});
	}



	//methods

	let generateFileName = (params) => {
		return (params.studentName + "-" + params.quizId + ".png").trim();
	}

	let sendBase64res = (imagePath) => {
		image2base64(imagePath).then(
				(response) => {
					res.send({
						base64img: response
					});
				})
			.catch(
				(error) => {
					res.send({
					error:'Error converting image to base64'});
					console.log(error);
				})
	}

	let resizeImageToFile = async (image, fileName) => {

		let imageFile = await Image.load(image);
		let tmpImage = imageFile;

		if (imageFile.width > 1024) {
			tmpImage = imageFile.resize({
				width: 1024
			});
		}
		if (imageFile.height > 1024) {
			tmpImage = tmpImage.resize({
				height: 1024
			})
		}

		await tmpImage.save(`./quizattachments/${fileName}`);

		return `./quizattachments/${fileName}`
	}

	let fileName = generateFileName({
		studentName: 'vusi',
		quizId: '001'
	});

	resizeImageToFile(quizAttachment.data, fileName).then((res) => {
		sendBase64res(res);
	})

});

const PORT = process.env.PORT || 5656;

app.listen(PORT, () => {
	console.log(`Upload app running on :  ${PORT}`);
});