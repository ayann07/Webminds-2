const jwt=require('jsonwebtoken');
const User=require('../models/user-model')

const isAuthenticatedUser=async (req,res,next)=>{
    const token=req.header('Authorization');
   
    if(!token){
        return res.status(404).json({msg:"Unauthorized request"});
    }
    const jwtToken=token.replace("Bearer","").trim();
    try{
        const decodedData=jwt.verify(jwtToken,process.env.JWT_KEY);
        const userData=await User.findOne({email:decodedData.email}).select({password:0});
        req.user=userData;
        req.token=token;
        req.userId=userData._id;
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized. Invalid Token"});
    }
    next();
}

module.exports=isAuthenticatedUser;