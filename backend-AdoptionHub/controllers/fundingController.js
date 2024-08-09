const Funding = require("../model/fundingModel");
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' })
    ]
});

const addFunding = async (req, res) => {
    const { user, amount } = req.body;
    const newFunding = new Funding({
        user: user,
        amount: amount,
    });

    try {
        await newFunding.save();
        res.status(200).json({
            success: true,
            message: "Funding created successfully",
        });
        logger.info('Funding created successfully', { user, amount });
    } catch (error) {
        logger.error('Error in addFunding', { error: error.message });
        res.status(500).json("Something went wrong. Please try again later.");
    }
};

const getAllFunding = async (req, res) => {
    try {
        const listOfFunding = await Funding.find().populate("user");
        return res.json({
            success: true,
            message: "Funding fetched successfully",
            funding: listOfFunding,
        });
        logger.info('Fetched all funding records');
    } catch (error) {
        logger.error('Failed to fetch funding records', { error: error.message });
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

const getSingleFunding = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            success: false,
            message: "Id is required!",
        });
    }
    try {
        const singleFunding = await Funding.findById(id);
        res.json({
            success: true,
            message: "Funding fetched successfully",
            product: singleFunding,
        });
        logger.info('Fetched single funding record', { id });
    } catch (error) {
        logger.error('Error in getSingleFunding', { error: error.message });
        res.status(500).json("Server Error");
    }
}

const deleteFunding = async (req, res) => {
    try {
        const deleteFunding = await Funding.findByIdAndDelete(req.params.id);
        if (!deleteFunding) {
            return res.json({
                success: false,
                message: "Funding not found",
            });
        }
        res.json({
            success: true,
            message: "Funding deleted successfully",
        });
        logger.info('Deleted funding record', { id: req.params.id });
    } catch (error) {
        logger.error('Error in deleteFunding', { error: error.message });
        res.status(500).json("Server Error");
    }
}

module.exports = {
    addFunding,
    getAllFunding,
    getSingleFunding,
    deleteFunding,
};
