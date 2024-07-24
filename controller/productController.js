import productModel from "../models/productModel.js"

export const createProduct = async (req, res) => {
   
    const { productName, categoryId, buyDate,productDetails, serialNo } = req.body
    if (!productName || !categoryId || !buyDate || !serialNo) {
        return res.status(400).json({
            message: "Please enter  data"
        })
    }
    console.log(productDetails," productDetails");
    try {
        const find = await productModel.findOne({
            
            serialNo:  { $regex: new RegExp(serialNo, 'i') }
        })

        if (find) {
            return res.status(400).json({
                message: `${serialNo} Already Exists`
            })
        }



        const createPrdouct = await productModel.create({
            productName,
            categoryId,
            buyDate,
            productDetails,
            serialNo,
            
        })
        console.log(createPrdouct,"loo");
        res.status(201).json({
            message: "success",
            error: false,
            data: createPrdouct
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllProduct = async (req, res) => {
    let { search } = req.query;



    try {
        let getdata;
        let getlength;

        if (!search) {
            getlength = await productModel.countDocuments();
            getdata = await productModel
                .find({isActive: true})

                .populate({ path: 'categoryId', select: 'categoryName' })

                .exec();
        } else {
            const searchCriteria = {
                $or: [
                    { serialNo: { $regex: search, $options: "i" } },

                ],
            };
            getlength = await productModel.find(searchCriteria).countDocuments();
            getdata = await productModel
                .find(searchCriteria).where({isActive: true})

                .populate({ path: 'categoryId', select: 'categoryName' })

                .exec();
                console.log(getdata,"loo");
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
        const exists = await productModel.find({
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
        const exists = await productModel.findById(
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

export const editProduct = async (req, res, next) => {
    // Extract the ID parameter from the request URL
    const { id } = req.params;

    try {




        // Extract data from the request body
        const {
            productName, categoryId, buyDate, productDetails,serialNo
        } = req.body;

        // Build an object for updating the About document
        const updateData = {
            productName, categoryId, buyDate, productDetails,serialNo


        };

        // Update the existing About document by ID, and return the updated document
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // If an About document was updated, respond with the updated document
        if (updatedProduct) {
            return res.status(200).json({ message: 'Product data information updated successfully!', data: updatedProduct });
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

export const enable_disable_product = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await productModel.findById(id)
        if (exists) {
            const enable_disable = await productModel.findByIdAndUpdate(
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