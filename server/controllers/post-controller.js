
var Post = require("../datasets/posts");
module.exports.createPost = function(req, res){
	console.log(req.body);
	var post = new Post(req.body);
	post.save();
	Post.find({} )
		.sort({date: -1}).exec(function(err , allPosts){
		if(err){
			console.log(err);
		}
		else{
			res.json(allPosts);
		}
	})
};

module.exports.getPosts = function(req , res){
	Post.find({})
	.sort({date: -1}).exec(function(err , allPosts){
		if(err){
			res.error(err);
		}else{
			res.json(allPosts);
		}
	})
}