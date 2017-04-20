const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const port = 3000;

//Need to enter username and password for your database
const connString = "postgres://postgres:test@localhost/assessbox";

const app = module.exports = express();

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

    // //Delete previous table
    // db.delete_users_table(function () {
    //   console.log("Delete user table");
    // });

    // db.delete_vehicles_table(function () {
    //   console.log("Delete Vehicle table");
    // });
    // //========================

    // //Create new table.
    // db.create_users_table(function () {
    //   console.log("Creating Users table");
    // });

    // db.create_vehicles_table(function () {
    //   console.log("Creating vehicles table");
    // });
    // //========================

    //Inserting user  and vehicle data.
    db.user_create_seed(function () {
      console.log("User Table Init");
    });

    db.vehicle_create_seed(function () {
      console.log("Vehicle Table Init");
    });
  });

const serverCtrl = require('./serverCtrl.js');



//Requested Endpoints

//GET '/api/users'
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

//GET '/api/vehicles'
app.get('/api/vehicles', function (req, res, next) {
  console.log('Function getAllVehicles Activated');
  db.getAllVehicles(function (err, data) {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(404).send('User not Found.', err);
    }
  });
});

// //POST '/api/users'
app.post('/api/users', function (req, res, next) {
  console.log('Function add_users Activated');
  console.log('Reqeust body data: ', req.body);
  let firstName = req.body.firstname,
    lastName = req.body.lastname,
    email = req.body.email;

  db.add_users([firstName, lastName, email], function (err, sqlResponse) {
    if (!err) {
      res.status(200).send(sqlResponse);
    } else {
      res.status(500).send('Error', err);
    }
  });
});




//===========================



//Test Endpoints
//app.get('/api/vehicles', serverCtrl.getAllVehicles);
//==========================


app.listen(port, function () {
  console.log("Successfully listening on : ", port);
});