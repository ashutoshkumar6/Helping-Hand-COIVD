const jwt=require('jsonwebtoken')
const User=require('../model/user')


const check=async (req,res,next)=>{
   
    try{
        const token=req.cookies.jwt
        const verifY=jwt.verify(token,process.env.SECRET_KEY)
        const user=await User.findOne({_id:verifY._id})
        req.user=user
        next()
    }catch(e){
        next()
    }

}


module.exports=check