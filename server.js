var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
var authenticationController = require('./server/controllers/authentication-controller');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/time-pass');
//mongoose.connect('mongodb://localhost:27017/time-pass');

app.use('/app' , express.static( __dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));


app.get('/', function(req,res){ 
	res.sendFile( __dirname + "/index.html");
})

var port = process.env.PORT || 3000;
//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);
app.listen(port, function() {
console.log("Listening on " + port);
});