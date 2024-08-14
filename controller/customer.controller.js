const asyncHandler = require("express-async-handler")
const validator = require("validator")
const { checkEmpty } = require("../utils/CheackEmpty")
const Customer = require("../model/Customer")

exports.RegisterCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile, address, password } = req.body
    const userId = req.loggedInUser
    console.log(userId)

    const { isError, error } = checkEmpty({ name, email, mobile, password, userId })
    if (isError) {
        return res.status(401).json({ message: "All Fields Required", error: error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "In Valid Mobile" })
    }
    await Customer.create({ name, email, mobile, address, password, userId })
    res.json({ message: "Customer Register Success" })
})

exports.FetchAllCustomers = asyncHandler(async (req, res) => {
    const userId = req.loggedInUser || req.params.id
    // console.log(userId)
    const result = await Customer.find({ userId })
    res.json({ message: "Customer Fetch Success", result })
})