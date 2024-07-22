import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import connectToDb from './connection/config.js';
import departmentRouter from './router/departmentRouter.js'
import subDepartmentRouter from './router/subDepartmentRouter.js'
import positionRouter from './router/postionRouter.js'
import employeeRouter from './router/employeeRouter.js'
import categoryRouter from  './router/categoryRouter.js'
import productRouter from './router/productRouer.js'
import productAssignRouter from './router/productAssignRouter.js';
const app = express();

const PORT = process.env.PORT


// get data from body 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
connectToDb()
app.use(cors("*"));
app.use(morgan('tiny'));


//api for department
app.use('/api/v1/department', departmentRouter)

//api for sub department
app.use('/api/v1/subdepartment', subDepartmentRouter)
//api for  position
app.use('/api/v1/position', positionRouter)
//api for employee
app.use('/api/v1/employee', employeeRouter)

//api for category
app.use('/api/v1/category',categoryRouter)

//api for product
app.use('/api/v1/product',productRouter)
app.use('/api/v1/product_assign',productAssignRouter)
app.listen(PORT, () => {
    console.log(`PORT is ${PORT}` || 9080);
})