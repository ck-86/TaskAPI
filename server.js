/*-------------------------------------------------------------/
| Creating a Basic Web-Server
|--------------------------------------------------------------/
| This will server RESTful services for 'task/to-do list'
*/

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var port = 1337;

//--- Require Mongoose ---//
var mongoose = require('mongoose');

var app = express();

/*----------------------------------------/
	Body-Parse Middleware to read data
	from POST Forms	
/-----------------------------------------*/
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

//--- Connect MongoDB ---//
mongoose.connect("mongodb://localhost/Project");

//--- MongoDB Schema ---//
var TaskSchema = new mongoose.Schema({
		  id: Number,	
	   title: String,
	priority: Number
});

//--- Create Model ---//
var Tasks = mongoose.model('Tasks', TaskSchema);

/*-------------------------------------------------------------/
| API Version 1.0
|--------------------------------------------------------------/
| This is an anti-pattern way to create sub-version of API,
| This is good for basic app.
*/


	/*----------------------------------------/
		Read All Tasks
	/-----------------------------------------*/
	app.get('/v1/tasks', function(req,res){
		Tasks.find({}, function(err, docs) {
			res.json(docs);
		});
	});

	/*----------------------------------------/
		Delete All Tasks
	/-----------------------------------------*/
	app.delete('/v1/tasks', function(req,res){
		Tasks.remove({}, function(err){
			if(err){
				res.json(err);
			} else{
				res.json({status: 'OK'});
			}
		});
	});



	//--- GET : Read Single task with id ---//
	app.get('/v1/task/:taskId',function(req,res){
		/*----------------------------------------/
			Create a JSON - taskId {id:1}
			to find from database 
		/-----------------------------------------*/
		var taskId = {id:req.params.taskId};

		Tasks.findOne(taskId, function(err, docs){
			res.json(docs);
		});
	});

	//--- POST : Add new task ---//
	app.post('/v1/task',function(req,res,next){

		/*----------------------------------------/
			Create a new Tasks Model and asign
			values from FORM POST and chain to
			mongoose save() method.
			'save()' accept 1 callback with error
			and docs (resent documents) as params
		/-----------------------------------------*/
		
		new Tasks({
			id: req.body.id,
			title: req.body.title,
			priority: req.body.priority
		}).save( function (err, docs) {
			if(err) {
				res.json(err);
			}
			else{
				/*----------------------------------------/
					On save successful retun the current
					document 'docs'
				/-----------------------------------------*/
				res.json(docs);
			}
		});
	});

	//--- PUT : Edit task ---//
	app.put('/v1/task/:taskId', function(req, res){
		//--- Get Task ID from URL ---//
		var taskId = {id:req.params.taskId};

		//--- Get New Task Value from FORM ---//
		var newTaskValue = {
			id: req.body.id,
			title: req.body.title,
			priority: req.body.priority
		};

		/*----------------------------------------/
			Update Tasks Model and if success
			'docs' return 1 
		/-----------------------------------------*/
		Tasks.update(taskId, newTaskValue, function(err,docs){
			if(err) {
				res.json(err);
			} else {
				if(docs===1){
					res.json({status:'OK'});
				}
			}
		});
	});

	//--- DELETE : Delete single task ---//
	app.delete('/v1/task/:taskId', function(req,res){
		Tasks.remove({id:req.params.taskId}, function(err){
			if(err){
				res.json(err);
			} else{
				res.json({status:'OK'});
			}
		});
	});





//--- Star Server Listening on PORT pre-specified ---//
app.listen(port, function(){
	console.log('NodeJS server started on port : ' + port);
});