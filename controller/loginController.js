

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
        return res.status(200).json({
            message:"login successfull p",
            data:userEmail
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