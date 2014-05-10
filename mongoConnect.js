var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project');
var db = mongoose.connection;

var taskModel = require('./schemas/task.js');


db.on('error', console.error.bind(console, 'connection error:'));

function addTask(taskJSON){
	
	var newTask = new taskModel(taskJSON);

	db.once('open', function callback () {
	//--- Create New Value ---//
	newTask.save(function (err, newTask){
		if(err) return console.error(err);
	});
	console.log(newTask);
	});
}

var taskJSON = {id:1, title:'Some cool task 5', priority:1};
addTask(taskJSON);
