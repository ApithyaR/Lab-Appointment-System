const mongoose = require('mongoose');
const User = require('./userModel');

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'admin',
    },
});

adminSchema.add(User.schema);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;