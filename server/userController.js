const mongoose = require('mongoose');
const express = require('express');
const { User } = require('./Users');


const userController = {};

userController.getUsers = (req, res, next) => {
    console.log('getUsers invoked');
    User.find({}, (err, found) => console.log(found));
    // console.log(foundUser);
    return next();
}

module.exports = userController;