const mongoose=require('mongoose')
const db_port='mongodb://localhost:27017/User'

mongoose.connect(db_port,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})