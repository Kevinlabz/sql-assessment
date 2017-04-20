var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var port = 8888;

//Need to enter username and password for your database
var connString = "postgres://postgres:test@localhost/assessbox";

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({
    connectionString: connString
  },
  function (err, localdb) {
    console.log('test showing err: ', err);
    db = localdb;
    app.set('db', db);

    //Delete previous table
    db.delete_users_table(function () {
      console.log("Delete user table");
    });

    db.delete_vehicles_table(function () {
      console.log("Delete Vehicle table");
    });

    //Create new table.
    db.create_users_table(function () {
      console.log("Creating Users table");
    });

    db.create_vehicles_table(function () {
      console.log("Creating vehicles table");
    });

    //Inserting user  and vehicle data.
    db.user_create_seed(function () {
      console.log("User Table Init");
    });

    db.vehicle_create_seed(function () {
      console.log("Vehicle Table Init")
    });
  });

var serverCtrl = require('./node_scripts/serverCtrl.js');



//Requested Endpoints
//app.get('/api/users',function () {console.log('test');}, serverCtrl.getAllUsers);
//app.get('/api/vehicles', serverCtrl.getAllVehicles);




//Test Endpoints
//app.get('/api/vehicles', serverCtrl.getAllVehicles);


app.listen(port, function () {
  console.log("Successfully listening on : ", port);
});