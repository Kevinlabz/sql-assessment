var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');


//Need to enter username and password for your database
const config = require('./config.js');
//Connecting setting is inside the config file.


var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({
    connectionString: config.connectionString
  },
  function (err, localdb) {
    console.log('test showing err: ', err);
    db = localdb;
    app.set('db', db);

    // //Delete previous table
    // db.delete_users_table(function () {
    //   console.log("Delete user table");
    // });

    // db.delete_vehicles_table(function () {
    //   console.log("Delete Vehicle table");
    // });
    // //========================

    //Create new table.
    db.create_users_table(function () {
      console.log("Creating Users table");
    });

    db.create_vehicles_table(function () {
      console.log("Creating vehicles table");
    });
    //========================

    //Inserting user  and vehicle data.
    db.user_create_seed(function () {
      console.log("User Table Init");
    });

    db.vehicle_create_seed(function () {
      console.log("Vehicle Table Init");
    });
  });

app.get('/api/users', function (req, res) {
  console.log('Function getAllUsers Activated');
  db.get_all_users(function (err, data) {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(404).send('User not Found.', err);
    }
  });
});


app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
