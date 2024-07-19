
const mongoose = require("mongoose");

const fundingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
},
{timestamps: true});

const Funding = mongoose.model("Funding", fundingSchema);

module.exports = Funding;
