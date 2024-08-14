const router = require("express").Router()
const productController = require("./../controller/product.controller")
router
    .post("/add-post", productController.AddProduct)

module.exports = router