var constants = {};

constants.path = {
	"templates" : "/client/templates/",
	"images" : "/client/images"
};

constants.templates = {
	"error" : "error.html",
	"page_not_found" : "page_not_found.html",
	"index" : "index.html",
	"login" : "login.tmpl"
};

constants.images = {
	"login_background" : "login_background.jpg"
};

constants.messages = {
	"server_start" : "server started at localhost:3000"
};

constants.regexp = {
	"move_up_directory" : "\/[a-zA-Z]*$"
}

module.exports = (function(){
	
	for(template in constants.templates){
		constants.templates[template] = constants.path.templates + constants.templates[template];
	};

	for(image in constants.images){
		constants.templates[image] = constants.path.images + constants.templates[image];	
	};
	
	return constants;
})();