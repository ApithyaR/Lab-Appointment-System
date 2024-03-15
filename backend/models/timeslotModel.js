
const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    startTime: Date, 
    endTime: Date, 
    booked: { type: Boolean, default: false } 
});

const Timeslot = mongoose.model('Timeslot', timeslotSchema);

module.exports = Timeslot;