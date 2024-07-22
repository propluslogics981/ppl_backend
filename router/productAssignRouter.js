import express from 'express'
import {
    createProductAssign,
    delete_productAssign,
    editProductAssign,
    getAllProductAssign,
    maintanceIssued,
    maintanceIssuedSolved

} from '../controller/productAssignController.js'

const router = express.Router()

//Add product_assign

router.post('/add_product_assign', createProductAssign)

//find product_assign
router.get('/all_product_assign', getAllProductAssign)

//edit product_assign
router.put('/edit_product_assign/:id', editProductAssign)

//enable disable
router.put('/delete_product_assign/:id', delete_productAssign)

// maintance issed 

//maintence_issue 
router.put('/maintence_issue_product_assign/:id', maintanceIssued)

//maintence_issue solved

router.put('/maintence_issue_solved_product_assign/:id', maintanceIssuedSolved)

export default router