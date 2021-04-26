const jwt=require('jsonwebtoken')
const User=require('../model/user')


const auth=async (req,res,next)=>{
   
    try{
        const token=req.cookies.jwt
        // console.log(token)
        const verifY=jwt.verify(token,process.env.SECRET_KEY)
        // console.log(verify)
        const user=await User.findOne({_id:verifY._id})
        // console.log(user)
        req.tokens=token
        req.user=user
        next()
    }catch(e){
        next()
    }

}


module.exports=auth