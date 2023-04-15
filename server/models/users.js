const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    image:{
        data: Buffer,
        contentType: String
    },
    token:{
        type: String,
    }
});

const Users=mongoose.model('User',UserSchema);

module.exports = Users;

