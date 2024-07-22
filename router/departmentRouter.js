import express from 'express'
import {createDepartment,
    getallDepartment,
    
    editDepartment,
    enable_disable_Department
} from '../controller/departmentController.js'

const router=express.Router()

//Add department

router.post('/add_deparment',createDepartment)

//find department
router.get('/all_deparment',getallDepartment)

//edit department
router.put('/edit_deparment/:id',editDepartment)

router.put('/enable_disable_deparment/:id',enable_disable_Department)


export default router