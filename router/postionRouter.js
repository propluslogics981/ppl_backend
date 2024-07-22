import express from 'express'
import {
    createPostion,
    editPostion,
    enable_disable_postion,
    getAllPostion

} from '../controller/positonController.js'

const router = express.Router()

//Add position

router.post('/add_position', createPostion)

//find position
router.get('/all_position', getAllPostion)

//edit position
router.put('/edit_position/:id', editPostion)

//enable disable
router.put('/enable_disable_position/:id', enable_disable_postion)


export default router