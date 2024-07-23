import generateToken from "../utils/genarateToken.js"

const userLogin=async(req,res)=>{
    const userEmail='hr@proplusLogics.com'
    const userPassword ='hr@proplusLogics.com'
    const {email,password}=req.body
    if(!email){
        return res.status(400).json({
            message:"please enter your email"
        })
    }
    if(!password){
        return res.status(400).json({
            message:"please enter your password"
        })
    }
    try{
       if (userEmail==email && userPassword==password){

        const token=generateToken(userEmail)

        return res.status(200).json({
            message:"Successfully login",
            data:userEmail,
            token,
            error:false

        })
        
       }else{
        return res.status(400).json({
            message:"Please check your Email and Password"
        })  
       }
       
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export  {userLogin}