import express from 'express'
import {
    createSubDepartment,
    editSubDepartment,
    getallSubDepartment,
    enable_disable_SubDepartment

} from '../controller/subDepartmentModel.js'

const router = express.Router()

//Add department

router.post('/add_subdeparment', createSubDepartment)

//find department
router.get('/all_subdeparment', getallSubDepartment)

//edit department
router.put('/edit_subdeparment/:id', editSubDepartment)

router.put('/enable_disable_subdeparment/:id', enable_disable_SubDepartment)


export default router