import categoryModel from "../models/categoryModel.js"

export const createCategory = async (req, res) => {
    const { categoryName } = req.body
    if (!categoryName) {
        return res.status(400).json({
            message: "Please enter your categoryName"
        })
    }
    try {
        const find = await categoryModel.findOne({
            categoryName: { $regex: new RegExp(categoryName, 'i') }
        });
        if (find) {
            res.status(409).json({
                message: `${categoryName} Already Exists`
            })
        }
        else {
            const create = await categoryModel.create({
                categoryName: categoryName
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


export const getallCategory = async (req, res, next) => {
    try {
        const exists = await categoryModel.find({
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

export const getallActiveCategory = async (req, res, next) => {
    try {
        const exists = await categoryModel.find({
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

export const getOneCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await categoryModel.findById(
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

export const editCategory = async (req, res, next) => {
    const { id } = req.params
    const { categoryName } = req.body
    try {
        const exists = await categoryModel.findOne({
            _id: id
        })

        if (exists) {

            const existsidwithcategoryName = await categoryModel.findOne({
                categoryName
            })
            if (existsidwithcategoryName && existsidwithcategoryName._id.toString() == id) {
                let updateContact = await categoryModel.findOneAndUpdate(
                    { _id: id },
                    { categoryName: categoryName },
                    { new: true }
                )
                res.status(200).json({
                    message: "success",
                    data: updateContact
                })
            }

            else if (existsidwithcategoryName) {
                res.status(409).json({
                    message: `${categoryName} is exists`,
                })
            }
            else {
                let editContact = await categoryModel.findOneAndUpdate(
                    { _id: id },
                    { categoryName: categoryName },
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

export const enable_disable_Category = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await categoryModel.findById(id)
        if (exists) {
            const enable_disable = await categoryModel.findByIdAndUpdate(
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