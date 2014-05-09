/*-------------------------------------------------------------/
| Creating a Basic Web-Server
|--------------------------------------------------------------/
| This will server RESTful services for 'task/to-do list'
*/

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var port = 1337;

var app = express();

/*----------------------------------------/
	Body-Parse Middleware to read data
	from POST Forms	
/-----------------------------------------*/
app.use(bodyParser());


/*-------------------------------------------------------------/
| API Version 1.0
|--------------------------------------------------------------/
| This is an anti-pattern way to create sub-version of API,
| This is good for basic app.
*/

	//--- GET HOME PAGE ---//
	app.get('/',function(req,res){
		res.send('Task Home Page');
	});

	//--- GET : Read Single task with id ---//
	app.get('/v1/task/:taskId', function(req,res){
		res.send('Reading task with id : ' + req.params.taskId); // get from query string
	});

	//--- POST : Add new task ---//
	app.post('/v1/task',function(req,res,next){
		res.json(req.body); // get from form post
	});

	//--- PUT : Edit task ---//
	app.put('/v1/task/:taskId', function(req, res){
		// fetching taskId and appending in req.body
		req.body.taskId = req.params.taskId;
		res.json(req.body);
	});

	//--- DELETE : Delete single task ---//
	app.delete('/v1/task/:taskId', function(req,res){
		res.send('Deleting Task with id : ' + req.params.taskId);
	});

	/*----------------------------------------/
		Read and Delete All Task
	/-----------------------------------------*/

	app.get('/v1/tasks', function(req,res){
		// Read all task from DB
		res.send('Read all tasks');
	});

	app.delete('/v1/tasks', function(req,res){
		res.send('Delete all tasks');
	});



//--- Star Server Listening on PORT pre-specified ---//
app.listen(port, function(){
	console.log('Node Server Listening on port : ' + port);
});