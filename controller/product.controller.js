const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/CheackEmpty")
const upload = require("../utils/upload")
const Products = require("../model/Products")
const cloudinary = require("../utils/cloudinary.config")



exports.GetAllProducts = asyncHandler(async (req, res) => {
    const result = await Products.find()
    res.json({ message: "Produts Fetch Success", result })
})

exports.AddProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { name, price, desc, qty, unit } = req.body
        const { isError, error } = checkEmpty({ name, price, desc, qty, unit })
        if (isError) {
            return res.status(401).json({ message: "All Fields Required ", error: error })
        }
        let images = ''
        const { secure_url } = await cloudinary.uploader.upload(path)
        images = secure_url
        await Products.create({ name, price, desc, qty, unit, images })
        res.json({ message: "Product SuccessFully Added" })
    })
})
exports.UpdateProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const Data = req.body
        const { isError, error } = checkEmpty(Data)
        if (isError) {
            return res.status(401).json({ message: "All Fields Required ", error: error })
        }
        console.log(req.file)
        let images = ''
        for (const item of req.files) {
            const { secure_url } = await cloudinary.uploader.upload(item.path)
            images = secure_url
        }
        await Products.findByIdAndUpdate(req.params.id, Data)
        res.json({ message: "Product SuccessFully Updated" })
    })
})
exports.DeleteProdcut = asyncHandler(async (req, res) => {
    await Products.findByIdAndDelete(req.params.id)
    res.json({ message: "Product SuccessFully Deleted." })
})