const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    userName: {type:String, required: true},
    userPassword: {type: String, required: true}    
});

const User = new mongoose.model('tests', UserSchema);

module.exports = { User };