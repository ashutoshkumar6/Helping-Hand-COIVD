const express=require('express')
const router=new express.Router()
const User=require('../model/user')
const Events=require('../model/create_event')
const { findById } = require('../model/user')
const cookieParser=require('cookie-parser')
const auth=require('../middleware/auth')
const check=require('../middleware/check')
const mongoose = require('mongoose')
const cors=require('cors')
// app.use(cors())

router.use(cookieParser())


router.post('/register',async(req,res)=>{
    const user= new User(req.body)
    try{
        await user.save()
       
       const token=await user.generateAuthtoken()
       res.cookie("jwt",token,{
           expires:new Date(Date.now()+6000000000000),
           httpOnly:true
       })
       // res.send({user,token})
       // res.render('login',{users:req.user})
       res.redirect('/login')
    }catch(e){
       res.redirect('/register')
    }
})

router.post('/login',async(req,res)=>{
   // console.log(req.body)
   try{
       const user=await User.findByCredinitials(req.body.email,req.body.password)
       // console.log(user)
       const token=await user.generateAuthtoken()
       res.cookie("jwt",token,{
           expires:new Date(Date.now()+6000000000000),
           httpOnly:true
       })
       res.redirect('/')
   }catch(e){
       res.redirect('/login')
   }
})

//PATCH Route
router.post('/update/:id',async(req,res)=>{
   
   try{

       const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       if(!user){
           res.status(404).send('error')
       }
       res.redirect('/')
   }catch(e){
       res.status(404).send('error')
   }
})



router.get('/',check,async(req,res)=>{
   // console.log(req.cookies.jwt)
   const events=await Events.find()
//    console.log(events)
   res.render('index',{users:req.user,events:events})
})

router.get('/detail',async(req,res)=>{
    const events=await Events.find()
    res.send(events)
})

router.get('/company',check,(req,res)=>{
   
   res.render('company',{users:req.user})
})

router.get('/register',(req,res)=>{
   res.render('register',{users:req.user})
})

router.get('/login',(req,res)=>{
   res.render('login',{users:req.user})
})

router.get('/update/:id',check,(req,res)=>{
   
    if(mongoose.isValidObjectId(req.params.id)){
   res.render('update',{users:req.user})}
   else{
    const val=req.params.id
    res.redirect('/'+val)
   }
})

router.get('/hello',auth,(req,res)=>{
   // console.log(`token is ${req.cookies.jwt}`)
   if(req.user===undefined){
       res.render('login',{users:req.user}) 
   }else{
       res.render('hello',{users:req.user}) 
   }
})

router.get('/logout',auth,async(req,res)=>{
   try{
       // console.log(req.user)
       req.user.tokens=req.user.tokens.filter((tokenElement)=>{
               return tokenElement!==req.token
       })
       // console.log('logout')
       res.clearCookie("jwt")
       
       await req.user.save()
       // res.render('login',{users:undefined})
       res.redirect('/')
   }catch(e){
       res.send('error')
   }
})

router.get('/event',check,(req,res)=>{
    res.render('event',{users:req.user})
})

router.post('/event',check,async (req,res)=>{
    const event=new Events({
        event_name:req.body.event_name,
        event_organizer:req.body.event_organizer,
        event_type:req.body.event_type,
        location:{
            type:'Point',
              coordinates: [req.body.lon,req.body.lat]
        }
    })
    await event.save()
    // console.log(event.location.coordinates[0])
   
    res.redirect('/')
})

module.exports=router