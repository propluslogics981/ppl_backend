import express from 'express'
import {
    createEmployee,
    editEmployee,
    enable_disable_employee,
    getAllEmployee

} from '../controller/employeeController.js'
import {userLogin} from '../controller/loginController.js'

const router = express.Router()

//login roter

router.post('/login',userLogin)

//Add employee

router.post('/add_employee', createEmployee)

//find employee
router.get('/all_employee', getAllEmployee)

//edit employee
router.put('/edit_employee/:id', editEmployee)

//enable disable
router.put('/enable_disable_employee/:id', enable_disable_employee)


export default router