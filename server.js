var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var app = express();

app.use(bodyParser.json());
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var postController = require("./server/controllers/post-controller")
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/time-pass');
//mongoose.connect('mongodb://localhost:27017/time-pass');

app.use('/app' , express.static( __dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use(multipartMiddleware);


app.get('/', function(req,res){ 
	res.sendFile( __dirname + "/index.html");
})

var port = process.env.PORT || 3000;
//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

// Profile
app.post('/api/profile/editPhoto' , multipartMiddleware , profileController.updatePhoto);
app.post('/api/profile/updateusername', profileController.updateUsername);
app.post('/api/profile/updateBio',profileController.updateBio);
// Posts

app.post('/api/post/create', postController.createPost);
app.get('/api/post/get' , postController.getPosts);

app.listen(port, function() {
console.log("Listening on " + port);
});