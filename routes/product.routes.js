const router = require("express").Router()
const productController = require("./../controller/product.controller")
router
    .get("/fetch-post", productController.GetAllProducts)
    .post("/add-post", productController.AddProduct)

module.exports = router