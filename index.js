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

    // //Create new table.
    // db.create_users_table(function () {
    //   console.log("Creating Users table");
    // });

    // db.create_vehicles_table(function () {
    //   console.log("Creating vehicles table");
    // });
    // //========================

    //Inserting user  and vehicle data.
    db.user_create_seed(() => {
      console.log("User Table Init");
    });

    db.vehicle_create_seed(() => {
      console.log("Vehicle Table Init");
    });

    //Get all the users
    app.get('/api/users', (req, res) => {
      console.log('Function getAllUsers Activated');
      db.get_all_users(function (err, data) {
        if (!err) {
          res.status(200).send(data);
        } else {
          res.status(404).send('User not Found.', err);
        }
      });
    });

    //Get all the vehicles
    app.get('/api/vehicles', (req, res) => {
      console.log('Function Get all vehicle Activated');
      db.get_all_vehicles(function (err, data) {
        if (!err) {
          res.status(200).send(data);
        } else {
          res.status(404).send('User not Found.', err);
        }
      });
    });

    //User Creating
    app.post('/api/users', (req, res) => {
      console.log('Show me user creating input: ', req.body);
      db.create_user([req.body.firstname, req.body.lastname, req.body.email], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          console.log('Error occur creating user');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //Vehicle Creating
    app.post('/api/vehicles', (req, res) => {
      console.log('Show me vehicle creating input: ', req.body);
      db.create_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //will return a count of how many vehicles belong to the given user
    app.get('/api/user/:userId/vehiclecount', (req, res) => {
      console.log('Show me input: ', req.params.userId);
      db.get_qty_vehicles_by_user([req.params.userId], (err, count) => {
        if (!err) {
          res.status(200).send({
            count: count[0].count
          });
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //will find all vehicles that belong to the user with the provided users id
    app.get('/api/user/:userId/vehicle', (req, res) => {
      console.log('Show me input: (from showing vehicle', req.params.userId);
      db.get_all_vehicles_by_user([req.params.userId], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //will find all vehicles that belong to the user with the provided users Email
    app.get('/api/vehicle', (req, res) => {
      console.log('Show me input: (from show vehicle with email', req.query.userFirstStart);

      let email = '%';
      let firstLetter = '%';

      if (req.query.UserEmail) {
        email = req.query.UserEmail + '%';
      }

      if (req.query.userFirstStart) {
        firstLetter = req.query.userFirstStart + '%';
      }

      db.get_vehicle_by_email([email, firstLetter], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //that gets all vehicles newer than 2000 and sorted by year with the newest car first with the owner first and last name
    app.get('/api/newervehiclesbyyear', (req, res) => {
      db.newer_vehicle_by_year((err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //that changes the ownership of the provided vehicle to be the new user.
    app.put('/api/vehicle/:vehicleId/user/:userId', (req, res) => {
      console.log('Show me the input from Change user for vehicle: ', req.params);

      db.change_ownership([req.params.vehicleId, req.params.userId], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //removes ownership of that vehicle from the provided user, but does not delete the vehicle
    app.delete('/api/user/:userId/vehicle/:vehicleId', (req, res) => {
      console.log('Show me the input from Delete user info from Vehicle: ', req.params);

      db.delete_ownership([req.params.vehicleId, req.params.userID], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

    //deletes the specified vehicle
    app.delete('/api/vehicle/:vehicleId', (req, res) => {
      // console.log('Show me the input from Delete user info from Vehicle: ', req.params);

      db.delete_vehicle([req.params.vehicleId], (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else {
          //console.log('Error occur creating Vehicle');
          console.warn('error', err);
          return res.status(500).send(err);
        }
      });
    });

  });




app.listen('3000', function () {
  console.log("Successfully listening on : 3000")
})

module.exports = app;