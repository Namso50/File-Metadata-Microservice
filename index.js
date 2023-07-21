var express = require('express');
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) // dest: 'uploads/' is the destination folder where the uploaded file will be stored. If you don't specify the destination folder, the uploaded file will be stored in a temporary folder and will be deleted once the request is completed. You can also specify the destination folder dynamically by passing a function to dest. The function should return the destination folder as a string. The function is called with two arguments: req and file. req is the request object and file is the uploaded file. The function is useful when you want to upload files to different folders based on the user or some other conditions. For example, you can upload profile pictures of users to different folders based on the user id. 
var app = express();

// to parse the request body in POST requests into req.body. The urlencoded middleware parses the URL-encoded data with the querystring library and exposes the resulting object (containing the keys and values) on req.body. The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
app.use(express.urlencoded({ extended: true }))

// to parse the request body in POST requests into req.body. The json middleware parses the JSON-encoded data with the body-parser library and exposes the resulting object (containing the keys and values) on req.body.
app.use(express.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// upload.single('upfile') is a middleware that will process the file upload and add the file to the request object as req.file. upload.array('upfile') can be used to upload multiple files. The name of the input field (i.e. upfile) is used to retrieve the uploaded file. If you use upload.array(), the uploaded files will be stored in an array in req.files. You can access the uploaded file(s) with req.file or req.files respectively.
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.body); 
  console.log(req.file);
  res.json({
    name: req.file.originalname, // original name of the uploaded file like "image.png"
    type: req.file.mimetype, // type of the file like "image/png"
    size: req.file.size, // size of the file in bytes like 12345678
  });
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
