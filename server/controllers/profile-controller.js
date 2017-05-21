var User = require('../datasets/users');
var path = require('path');
var fs = require('fs-extra');

module.exports.updatePhoto = function(req,res){
	var file = req.files.file;
	var userId = req.body.userId;
	console.log("User " + userId + " is submitting " , file);
 	var uploadDate = Date.now().toString();
 /*	uploadDate = uploadDate.replace(".", "");
 	uploadDate = uploadDate.replace("-", "");
 	uploadDate = uploadDate.replace(":", "");*/
 	var tempPath = file.path;
 	var targetPath = path.join(__dirname, "../../uploads/" + userId + uploadDate + file.name);

 	fs.rename(tempPath , targetPath , function(err ){
 		if(err){
 			console.log(err);
 		}
 		else{
 			console.log("moved");
 		}
 	})


 }
