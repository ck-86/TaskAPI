var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
		id: Number,
	  title: String,
  priority: Number
});

module.exports = mongoose.model('task',taskSchema);