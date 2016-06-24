var mongoose = require("mongoose");
var eventEmitter = require("events").EventEmitter;
var exports = module.exports = {};
var user = require("./user_schema").curd;

mongoose.connect("mongodb://localhost:27017/authentication");

var dbConnector = {
	curd : {},
	connection : {}
};

dbConnector.connection = new eventEmitter();

//To create a user
var create_user = function(request){
	var userCreated = new Promise(function(resolve,reject){
		user.create(request).then(function(user){
			resolve(user);
		}, function(err){
			reject(err)
		});
	});

	return userCreated;
}

var validate_credentials = function(request){
	var credentialsValidated = new Promise(function(resolve,reject){
		user.validate_credentials(request).then(function(is_valid){
			resolve(is_valid);
		}, function(err){
			reject(err);
		});
	});
	return credentialsValidated;
}

mongoose.connection.on("open", function(){
	console.log("connection to database created successfully");
	dbConnector.connection.emit("connectionUp", mongoose.connection.db);
});

dbConnector.curd = (function(){
	var curd = {};
	curd.create = create_user;
	curd.read = validate_credentials;
	return curd;
})();

exports.dbConnector = dbConnector;