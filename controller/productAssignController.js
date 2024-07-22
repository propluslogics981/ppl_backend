
import productModelAssign from "../models/productAssignModel.js"

export const createProductAssign = async (req, res) => {
    const { productId, employeeId, assignedDate, returnDate } = req.body
    if (!productId || !employeeId || !assignedDate
    ) {
        return res.status(400).json({
            message: "Please enter  data"
        })
    }
    try {



        const createPrdouctAssign = await productModelAssign.create({
            productId,
            employeeId,
            assignedDate,
            returnDate
        })
        res.status(201).json({
            message: "success",
            error: false,
            data: createPrdouctAssign
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllProductAssign = async (req, res) => {
    let {  search } = req.query;
   

    try {
        let getdata;
        let getlength;

        if (!search) {
            getlength = await productModelAssign.countDocuments();
            getdata = await productModelAssign
                .find()
                
                .populate({ path: 'productId', select: 'productName' })
                .populate({ path: 'employeeId', select: "employeeName" })

                .exec();
        } else {
            const searchCriteria = {
                $or: [
                    { 'productId.productName': { $regex: search, $options: "i" } },

                ],
            };
            getlength = await productModelAssign.find(searchCriteria).countDocuments();
            getdata = await productModelAssign
                .find(searchCriteria)
               
                .populate({ path: 'productId', select: 'productName' })
                .populate({ path: 'employeeId', select: "employeeName" })

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


export const getallActiveProduct = async (req, res, next) => {
    try {
        const exists = await productAssignModel.find({
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

export const getOneProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await productAssignModel.findById(
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

export const editProductAssign = async (req, res, next) => {
    
    const { id } = req.params;

    try {




        // Extract data from the request body
        const {
            productId, employeeId, assignedDate, returnDate
        } = req.body;

        // Build an object for updating the About document
        const updateData = {
            productId, employeeId, assignedDate, returnDate


        };
        console.log(updateData);
        // Update the existing About document by ID, and return the updated document
        const updatedProductAssign = await productModelAssign.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // If an About document was updated, respond with the updated document
        if (updatedProductAssign) {
            return res.status(200).json({ message: 'Product data information updated successfully!', data: updatedProductAssign });
        } else {
            // If no document was found with the given ID, respond with a 404 error
            return res.status(404).json({ error: 'Product data  information not found' });
        }
    } catch (error) {
        // Log the error (you might want to remove this log in production)
        console.log(error);

        // Respond with a 400 status code and the error message
        return res.status(400).json({ error: error.message });
    }
}

export const delete_productAssign = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await productAssignModel.findById(id)
        if (exists) {
            const enable_disable = await productAssignModel.findByIdAndUpdate(
                { _id: id },
                { isDeleted: !exists.isDeleted },
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


export const maintanceIssued = async (req, res) => {
    const { id } = req.params;
    try {
        const { date, reason } = req.body;
        const exists = await productAssignModel.findById(id);

        if (exists) {
            exists.maintenceDetails.push({
                maintanceIssueDate: date,
                maintence: true,
                reason
            });
            const maintanceIssueDate = await exists.save();

            res.status(200).json({
                message: "Maintenance issue marked successfully",
                data: maintanceIssueDate
            });
        } else {
            res.status(400).json({
                message: "Product assignment not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const maintanceIssuedSolved = async (req, res) => {
    const { id } = req.params;
    try {
        const { date } = req.body;
        const exists = await productAssignModel.findById(id);

        if (exists) {
            const lastMaintenance = exists.maintenceDetails[exists.maintenceDetails.length - 1];
            console.log(lastMaintenance);
            if (lastMaintenance && lastMaintenance.maintence) {
                lastMaintenance.maintanceIssueSolveDate = date;
                lastMaintenance.maintence = false;
                const maintanceIssueSolvedDate = await exists.save();
                res.status(200).json({
                    message: "Maintenance issue resolved successfully",
                    data: maintanceIssueSolvedDate
                });
            } else {
                res.status(400).json({
                    message: "No active maintenance issue found"
                });
            }
        } else {
            res.status(400).json({
                message: "Product assignment not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}