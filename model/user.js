const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:true
    },
    lastname:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    profession:{
        type:String,
        trim:true,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})



userSchema.methods.generateAuthtoken=async function(){
    const user=this
    // console.log(process.env.SECRET_KEY)
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY)

    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}


userSchema.statics.findByCredinitials=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new error('Check your email   ')
    }
   
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        throw new error('Check your password')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const User=mongoose.model('User',userSchema)

module.exports=User