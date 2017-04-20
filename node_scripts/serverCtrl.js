var app = require('../index.js');
var db = app.get('db');

module.exports = {};

//GET '/api/users'
exports.getAllUsers = function (req, res, next) {
    console.log('Function getAllUsers Activated');
    db.getAllUsers(function (err, data) {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(404).send('User not Found.', err);
        }
    });
};

//GET '/api/vehicles'
exports.getAllVehicles = function (req, res, next) {

};

//POST '/api/users'
exports.addUsers = function (req, res, next) {

};

//POST '/api/vehicles'
exports.addVehicles = function (req, res, next) {

};

//GET '/api/user/:userId/vehiclecount'  !how many vehicle.
exports.findUserVehiclesSum = function (req, res, next) {

};

//GET '/api/user/:userId/vehicle'    !find all vehcile belong to user
exports.findUserVehicles = function (req, res, next) {

};

//GET '/api/vehicle?email=UsersEmail'   !fina all vehicles that belong to user using email.
exports.findUserVehiclesUseEmail = function (req, res, next) {

};

//GET '/api/vehicle?userFirstStart=letters'   !find all vehicles for any user whose first name has these letters.
exports.findUserVehiclesByLetters = function (req, res, next) {

};

//GET '/api/newervehiclesbyyear'       !get all vehicles newer than 2000 and sort by year with newst car first with owners first and last name.
exports.findNewVehiclesByYear = function (req, res, next) {

};

//PUT '/api/vehicle/:vehicleId/user/:userId'    !changes the ownership of the provided vehicle to be the new user.
exports.findVehiclesAndChangeOwner = function (req, res, next) {

};

//DELETE '/api/user/:userId/vehicle/:vehicleId'     ! removes ownership of that vehicle from the provided user, but does not delete the vehicle
exports.removeVehicleOwnershipByUserIDandVehicleID = function (req, res, next) {

};

//DELETE '/api/vehicle/:vehicleId'      ! Delete vehicle by ID
exports.removeVehiclesBy = function (req, res, next) {

};




//Test Controllers