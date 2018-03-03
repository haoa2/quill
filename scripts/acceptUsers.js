require('dotenv').load();
var mongoose        = require('mongoose');
var database        = process.env.DATABASE || "mongodb://localhost:27017";
var jwt             = require('jsonwebtoken');
mongoose.connect(database);

var UserController = require('../app/server/controllers/UserController');
var User = require('../app/server/models/User');

var userAdmin = { email: process.env.ADMIN_EMAIL };
var count = 0;
User.find({}, function (err, users) {
	users.forEach(function(user){
		UserController.admitUser(user._id,userAdmin,function(){
			console.log('Uno más admitido!');
		});
		console.log('ID: '+user._id);
	});
});
console.log('Finalizado');
/*
var userArray = require('fs').readFileSync('accepted.txt').toString().split('\n');
console.log(userArray);

var count = 0;
userArray.forEach(function (id) {
  UserController.admitUser( id, user, function() {
    count += 1;
    if (count == userArray.length) {
      console.log("Done");
    }
  });
});
*/
