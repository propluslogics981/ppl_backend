import express from 'express'
import {createCategory,
    editCategory,
    enable_disable_Category,
    getallCategory
} from '../controller/categoryController.js'

const router=express.Router()

//Add category

router.post('/add_category',createCategory)

//find category
router.get('/all_category',getallCategory)

//edit category
router.put('/edit_category/:id',editCategory)

router.put('/enable_disable_category/:id',enable_disable_Category)


export default router