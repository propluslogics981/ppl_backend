import departmentModel from "../models/departmentModel.js"

export const createDepartment = async (req, res) => {
    console.log(req.body,"body");
    const { department } = req.body
    console.log(department,"department");
    if (!department) {
        return res.status(400).json({
            message: "Please enter your department"
        })
    }
    try {
        const find = await departmentModel.findOne({
            department: { $regex: new RegExp(department, 'i') }
        })
        console.log(find,"find");
        if (find) {
            res.status(409).json({
                message: `${department} Already exists`
            })
        }
        else {
            const create = await departmentModel.create({
                department: department
            })
            res.status(201).json({
                message: "success",
                data: create
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getallDepartment = async (req, res, next) => {
    try {
        const exists = await departmentModel.find({
            // isActive: true
        })
        if (exists.length > 0) {
            res.status(200).json({
                message: "success",
                data: exists
            })
        }
        else {
            res.status(400).json({
                message: "not exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getallActiveDepartment = async (req, res, next) => {
    try {
        const exists = await departmentModel.find({
            isActive: true
        })
        if (exists.length > 0) {
            res.status(200).json({
                message: "success",
                data: exists
            })
        }
        else {
            res.status(400).json({
                message: "not exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getOneDepartment = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await departmentModel.findById(
            id
        )
        if (exists) {
            res.status(200).json({
                message: "success",
                data: exists
            })
        }
        else {
            res.status(400).json({
                message: "id not exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const editDepartment = async (req, res, next) => {
    const { id } = req.params
    const { department } = req.body
    try {
        const exists = await departmentModel.findOne({
            _id: id
        })

        if (exists) {

            const existsidwithdepartment = await departmentModel.findOne({
                department
            })
            if (existsidwithdepartment && existsidwithdepartment._id.toString() == id) {
                let updateContact = await departmentModel.findOneAndUpdate(
                    { _id: id },
                    { department: department },
                    { new: true }
                )
                res.status(200).json({
                    message: "success",
                    data: updateContact
                })
            }

            else if (existsidwithdepartment) {
                res.status(409).json({
                    message: `${department} is exists`,
                })
            }
            else {
                let editContact = await departmentModel.findOneAndUpdate(
                    { _id: id },
                    { department: department },
                    { new: true }
                )
                res.status(200).json({
                    message: "success",
                    data: editContact
                })
            }

        }

        else {
            res.status(400).json({
                message: "not exists"
            })
        }


    } catch (error) {
        res.status(400).json({
            message: error.mssage
        })
    }
}

export const enable_disable_Department = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await departmentModel.findById(id)
        if (exists) {
            const enable_disable = await departmentModel.findByIdAndUpdate(
                { _id: id },
                { isActive: !exists.isActive },
                { new: true })
            res.status(200).json({
                message: "success",
                data: enable_disable
            })
        }
        else {
            res.status(400).json({
                message: "not exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}