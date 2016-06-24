var express = require('express');
var bodyParser = require("body-parser");
var sassMiddleware = require("node-sass-middleware");
var dbConnector = require("./mongoose.js").dbConnector;
var utils = require("./utils.js").utils;
var constants = require("./constants.js");
var app = express();
var db = {};

var regexp = new RegExp(constants.regexp.move_up_directory);
__dirname = __dirname.replace(regexp,"");

app.use(sassMiddleware({
		src: __dirname+"/client/styles/scss",
		dest: __dirname+"/client/styles/css",
		prefix:"/styles/css",
		debug : true
	})
);

app.use(express.static(__dirname+"/client"));
app.use(express.static(__dirname.replace(regexp,"") + "/node_modules"));

app.use(bodyParser.urlencoded({extended : false}));	
app.use(bodyParser.json());

app.use("/",function(req,res,next){	
	if(!utils.is_defined(db)){		
		res.sendFile(constants.templates.error,{
			root:__dirname
		});
	}
	else next();
});	

app.get("/",function(req,res){
	res.sendFile(constants.templates.index,{
		root: __dirname
	});
});

app.post("/validate_credentails",function(req,res){
	dbConnector.curd.read(req.body).then(function(doc){
		res.json(doc);
	}, function(err){
		res.json(err);
	});
});

app.post("/create_user",function(req,res){
	dbConnector.curd.create(req.body).then(function(doc){
		res.json(doc);
	}, function(err){
		res.json(err);
	});
});

app.get(/(.html$)|(.tmpl$)/,function(req,res){
	res.sendFile(constants.templates.page_not_found,{
		root: __dirname
	});
});

app.listen(3000,function(){
	console.log(constants.messages.server_start);
});

dbConnector.connection.on("connectionUp", function(data){	
	db = data;	
});