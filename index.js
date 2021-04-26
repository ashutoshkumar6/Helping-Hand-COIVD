require('dotenv').config()
const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const user_route=require('./router/user_route')
const app=express()
const cors=require('cors')
app.use(cors())

require('./database/db')

const port=3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const public=path.join(__dirname,'public')
const views=path.join(__dirname,'views')

app.set('view engine','ejs') 
app.set('views',views)
app.use(express.static(public))

app.use(user_route)

app.listen(port,()=>{  
    console.log(`Server is up at ${port}`)
}) 
