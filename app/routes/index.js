module.exports = function(application){
	application.get('/', function(req, res){
	application.app.controllers.index.home(application, req, res);

		// res.render('index');
	});
}