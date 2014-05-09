var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project');
var db = mongoose.connection;

var taskModel = require('./schemas/task.js');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	
	//--- Create New Value ---//
	var newTask = new taskModel({id:1, title:'Some cool task', priority:1});
	newTask.save(function (err, newTask){
		if(err) return console.error(err);
	});
	console.log(newTask);
});
