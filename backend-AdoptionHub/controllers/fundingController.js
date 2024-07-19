// user 
// amount 

const Funding = require("../model/fundingModel");

// created At 
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
} catch(error) {
console.log(error);
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
}
catch (error) {
console.error("Failed to fetch products:", error);
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
}
catch (error) {
console.log(error);


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
}
catch (error) {
console.log(error);
res.status(500).json("Server Error");
}
}
module.exports = {
addFunding,
getAllFunding,
getSingleFunding,
deleteFunding,
};
// Compare this snippet from controllers/storyController.js:
