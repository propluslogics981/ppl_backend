import postionModel from "../models/postionModel.js"

export const createPostion = async (req, res) => {
    const { positionName } = req.body
    if (!positionName) {
        return res.status(400).json({
            message: "Please enter your department"
        })
    }
    try {
        const find = await postionModel.findOne({
            positionName:  { $regex: new RegExp(positionName, 'i') }
        })
        if (find) {
            res.status(409).json({
                message: `${positionName} Already Exists`
            })
        }
        else {
            const create = await postionModel.create({
                positionName: positionName
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

export const getAllPostion = async (req, res, next) => {
    try {
        const exists = await postionModel.find({
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

export const getallActivePostion = async (req, res, next) => {
    try {
        const exists = await postionModel.find({
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

export const getOnePostion = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await postionModel.findById(
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

export const editPostion = async (req, res, next) => {
    const { id } = req.params
    const { positionName } = req.body
    try {
        const exists = await postionModel.findOne({
            _id: id
        })

        if (exists) {

            const existsidwithpositionName = await postionModel.findOne({
                positionName
            })
            if (existsidwithpositionName && existsidwithpositionName._id.toString() == id) {
                let updateContact = await postionModel.findOneAndUpdate(
                    { _id: id },
                    { positionName: positionName },
                    { new: true }
                )
                res.status(200).json({
                    message: "success",
                    data: updateContact
                })
            }

            else if (existsidwithpositionName) {
                res.status(409).json({
                    message: `${positionName} is exists`,
                })
            }
            else {
                let editContact = await postionModel.findOneAndUpdate(
                    { _id: id },
                    { positionName: positionName },
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

export const enable_disable_postion = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await postionModel.findById(id)
        if (exists) {
            const enable_disable = await postionModel.findByIdAndUpdate(
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