var utils = require("./utils.js").utils;
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var exports = module.exports = {};

/******************Setters*****************/
var setThumbnail = function(url)
{
	if(utils.is_not_defined(url))
		return "/dummy.jpg";
	
}

/****************** Schema ********************/
//_id id the primary key which is created by mongo 
var users_schema = new Schema({
	"username": {type: String, unique:true ,required:true},
	"password": {type:String, required:true},
	"thumbnail": {type: String, default:"/dummy.jpg"}
});

/****************** Model *********************/
//This is a collection
var users_model = mongoose.model("users",users_schema);

/**************** Middlewares *****************/
users_model.schema.pre('init', function(next)
{	
	//No need as of now
	next();
});

users_model.schema.pre('validate', function(next)
{
	//No need as of now	
	next();
})

users_model.schema.pre('save',function(next)
{	
	//No nned as of now
	next();
})
/*********** Response Constructor *************/

/****************** CURD **********************/
var create_user = function(usr)
{
	_user = new users_model(usr);
	return register_user(_user);
}

var register_user = function(_user)
{
	var user_registered = new Promise(function(resolve,reject)
	{
		_user.save(function(err,user)
		{
			if(err)
			{				
				return reject(err);
			}
			else
			{				
				return resolve(user);
			}
		});		
	});
	return user_registered;
}

var validate_credentials = function(usr)
{
	var credentialsValidated = new Promise(function(resolve,reject)
	{
		var key, value;
		if(utils.is_defined(usr.username))
		{
			key = "username";
			value = usr.username;
		}
		else
			resolve({error:{msg:"Required paramaters are missing"}});

		var query = {};
		query[key] = value;
		users_model.find(query,function(err,user)
		{
			if(err) 
				return reject(err);
			else 
			{
				var response = {};
				if(utils.is_defined(user.length) && user.length > 0 && user.length < 2)
				{
					if(utils.is_defined(usr.password))
					{
						 if(user[0].password === usr.password)
						 	response["password"] = {is_valid:true};
						 else
						 	response["password"] = {is_valid:false};
					}
					else
						response["username"] = {is_valid:true};
				}
				else
				{
					response["username"] = {is_valid:false};
				}
				resolve(response);
			}
		})
	})
	return credentialsValidated;	
};

var update_document = function(_document_new, operation)
{
	var document_updated = new Promise(function(resolve,reject)
	{
		if(utils.is_not_defined(_document_new._id))
		{
			return reject("Please provide the document Id");
		}		
		var search_query = {"_id":new mongodb.ObjectID(_document_new._id)};
		delete _document_new._id; //To make sure no set operation is performed on _id
		var update_query = {$set : _document_new};		
		expense_model.findOne(search_query,function(err,_document)
		{
			if(err)			
				return reject(err);
			else
			{				
				switch(operation)
				{
					default :
					{
						_document.update(update_query, {upsert:false}, function(err,_document)
						{
							if(err)								
								return reject(err);							
							else							
								return resolve(_document);							
						})
					}								
				}
			}
		});
	});

	return document_updated;	
};

var remove_document = function(_document)
{
	var removed_document = new Promise(function(resolve,reject)
	{
		var query = {"_id":new mongodb.ObjectID(_document._id)};
		expense_model.remove(query, function(err,_document)
		{
			if(err)
				return reject(err);
			else
				return resolve(_document);
		})
	});

	return removed_document;
};
/**************** Exports *********************/
exports.curd = {
	create : create_user,
	validate_credentials : validate_credentials
};