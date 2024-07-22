import subDepartmentModel from "../models/subDepartmentModel.js"

export const createSubDepartment = async (req, res) => {
    const { subDepartment } = req.body
    if (!subDepartment) {
        return res.status(400).json({
            message: "Please enter your department"
        })
    }
    try {
        const find = await subDepartmentModel.findOne({
            subDepartment:  { $regex: new RegExp(subDepartment, 'i') }
        })
        if (find) {
            res.status(409).json({
                message: `${subDepartment} Already Exists`
            })
        }
        else {
            const create = await subDepartmentModel.create({
                subDepartment: subDepartment
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

export const getallSubDepartment = async (req, res, next) => {
    try {
        const exists = await subDepartmentModel.find({
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

export const getallActiveSubDepartment = async (req, res, next) => {
    try {
        const exists = await subDepartmentModel.find({
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

export const getOneSubDepartment = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await subDepartmentModel.findById(
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

export const editSubDepartment = async (req, res, next) => {
    const { id } = req.params
    const { subDepartment } = req.body
    try {
        const exists = await subDepartmentModel.findOne({
            _id: id
        })

        if (exists) {

            const existsidwithsubdepartment = await subDepartmentModel.findOne({
                subDepartment
            })
            if (existsidwithsubdepartment && existsidwithsubdepartment._id.toString() == id) {
                let updateContact = await subDepartmentModel.findOneAndUpdate(
                    { _id: id },
                    { subDepartment: subDepartment },
                    { new: true }
                )
                res.status(200).json({
                    message: "success",
                    data: updateContact
                })
            }

            else if (existsidwithsubdepartment) {
                res.status(409).json({
                    message: `${subDepartment} is exists`,
                })
            }
            else {
                let editContact = await subDepartmentModel.findOneAndUpdate(
                    { _id: id },
                    { subDepartment: subDepartment },
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

export const enable_disable_SubDepartment = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await subDepartmentModel.findById(id)
        if (exists) {
            const enable_disable = await subDepartmentModel.findByIdAndUpdate(
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