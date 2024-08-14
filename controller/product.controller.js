const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/CheackEmpty")
const upload = require("../utils/upload")
const Products = require("../model/Products")
const cloudinary = require("../utils/cloudinary.config")

exports.AddProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { name, price, desc, qty, unit } = req.body
        const { isError, error } = checkEmpty({ name, price, desc, qty, unit })
        if (isError) {
            return res.status(401).json({ message: "All Fields Required ", error: error })
        }
        let images = ''
        for (const item of req.files) {
            const { secure_url } = await cloudinary.uploader.upload(item.path)
            images = secure_url
        }
        await Products.create({ name, price, desc, qty, unit, images })
        res.json({ message: "Product SuccessFully Added" })
    })
})