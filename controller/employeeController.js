import employeeModel from "../models/employeeModel.js"

export const createEmployee = async (req, res) => {
    const { employeeName, departmentId, subDepartmentId, positionId, employeeEmail, employeeDob, joiningDate, phone, proplusId } = req.body
    if (!employeeName || !departmentId || !subDepartmentId || !positionId ||
        !employeeEmail || !employeeDob || !joiningDate || !phone) {
        return res.status(400).json({
            message: "Please enter your department"
        })
    }
    try {
        const find = await employeeModel.findOne({
            employeeName: employeeName
        })
        if (find) {
            res.status(409).json({
                message: `${employeeName} Already Exists`
            })
        }
        else {
            const create = await employeeModel.create({
                employeeName,
                departmentId,
                subDepartmentId,
                positionId,
                employeeEmail,
                employeeDob,
                joiningDate,
                phone,
                proplusId
            })
            res.status(201).json({
                message: "success",
                data: create
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllEmployee = async (req, res, next) => {
    let {  search } = req.query;


   

    try {
        let getdata;
        let getlength;

        if (!search) {
            getlength = await employeeModel.countDocuments();
            getdata = await employeeModel
                .find()
               
                .populate({ path: 'departmentId', select: 'department' })
                .populate({ path: 'subDepartmentId', select: 'subDepartment' })
                .populate({ path: 'positionId', select: 'positionName' })
                .exec();
        } else {
            const searchCriteria = {
                $or: [
                    { employeeName: { $regex: search, $options: "i" } },

                ],
            };
            getlength = await employeeModel.find(searchCriteria).countDocuments();
            getdata = await employeeModel
                .find(searchCriteria)
               
                .populate({ path: 'departmentId', select: 'department' })
                .populate({ path: 'subDepartmentId', select: 'subDepartment' })
                .populate({ path: 'positionId', select: 'positionName' })
                .exec();
        }


        res.status(200).json({
            length: getlength,
            status: "success",
            error: false,

            data: getdata
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const getallActiveEmployee = async (req, res, next) => {
    try {
        const exists = await employeeModel.find({
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

export const getOneEmployee = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await employeeModel.findById(
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

export const editEmployee = async (req, res, next) => {
    const { id } = req.params

    const { employeeName, proplusId, departmentId, phone, subDepartmentId, positionId, employeeEmail, employeeDob, joiningDate } = req.body

    try {
        const exists = await employeeModel.findById(
            id
        )

        if (exists) {

            const existsidwithEmployee = await employeeModel.findOne({
                employeeName: exists?.employeeName
            })
            if (existsidwithEmployee && existsidwithEmployee._id.toString() == id) {

                let updateContact = await employeeModel.findOneAndUpdate(
                    { _id: id },
                    {
                        employeeName,
                        departmentId,
                        subDepartmentId,
                        positionId,
                        employeeEmail,
                        employeeDob,
                        joiningDate,
                        phone,
                        proplusId
                    },
                    { new: true }
                )
                res.status(200).json({
                    message: "success",
                    data: updateContact
                })
            }

            else if (existsidwithEmployee) {
                res.status(409).json({
                    message: `${employeeName} is exists`,
                })
            }
            else {
                let editContact = await employeeModel.findOneAndUpdate(
                    { _id: id },
                    { employeeName: employeeName },
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
        console.log(error);
        res.status(400).json({
            message: error.mssage
        })
    }
}

export const enable_disable_employee = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await employeeModel.findById(id)
        if (exists) {
            const enable_disable = await employeeModel.findByIdAndUpdate(
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