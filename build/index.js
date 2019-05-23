"use strict";
const express = require('express');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');
const app = express();

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.get('/',(req,res) => {

    res.sendFile('index.html',{root:'../public'});
})

app.post('/uploadQuizAttachment', function(req, res) {
  //handle possible file types since students can send none jpg images?

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
//get uploaded
  let quizAttachment = req.files.quizAttachment;
console.log('file name :' + quizAttachment.name);
  

  //send  back the url to the client for preview
  // console.log('sending back the image to client for preview');


  // move file to the img folder
  quizAttachment.mv('../img/quizattachments/quiz.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
      console.log('image uploaded')
  });

//now resize the image to 1024px using Sharp
let tmpUrl = quizAttachment.tempFilePath;
sharp(tmpUrl).resize({width:1024})
.toFile('resizedQuizAttachment.png').then(()=>{
console.log("image resized");
});



  res.send('uploaded!')


});


const PORT = process.env.PORT || 3000;
//FIRE TO THE SERVER  
app.listen(PORT, function () {
    console.log('upload page running on : ', PORT)
});