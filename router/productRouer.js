import express from 'express'
import {
    createProduct,
    editProduct,
    enable_disable_product,
    getAllProduct

} from '../controller/productController.js'

const router = express.Router()

//Add product

router.post('/add_product', createProduct)

//find product
router.get('/all_product', getAllProduct)

//edit product
router.put('/edit_product/:id', editProduct)

//enable disable
router.put('/enable_disable_product/:id', enable_disable_product)


export default router