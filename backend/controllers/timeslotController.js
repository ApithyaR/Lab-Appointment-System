const Timeslot = require('../models/timeslotModel'); 

// Create a new timeslot
exports.createTimeslot = async (req, res) => {
    const { test, date, startTime, endTime } = req.body;

    try {
        const newTimeslot = await Timeslot.create({
            test,
            startTime,
            endTime,
        });

        res.status(201).json({
            success: true,
            message: 'Timeslot created successfully',
            data: newTimeslot,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create timeslot',
        });
    }
};

// Get timeslots for a specific test
exports.getTimeslotsForTest = async (req, res) => {
    const { testId } = req.params;

    try {
        const timeslots = await Timeslot.find({ test: testId });

        res.status(200).json({
            success: true,
            data: timeslots,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch timeslots',
        });
    }
};

// ... Other functions for updating, deleting timeslots, potentially booking timeslots
