const Test = require('../models/testModel');

// Create a new test
exports.createTest = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const newTest = await Test.create({
            name,
            description,
            price,
        });

        res.status(201).json({
            success: true,
            message: 'Test created successfully',
            data: newTest,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create test',
        });
    }
};

// Get all tests
exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();

        res.status(200).json({
            success: true,
            data: tests,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tests',
        });
    }
};

// Other test-related controllers (update, delete, etc.)