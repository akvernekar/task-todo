const express =require('express')
const app=express()
const connectDb=require('./config/database')
const router=require('./config/routes')
const cors=require('cors')
const port=3040
connectDb()
app.use(express.json())

app.use(cors())
app.use('/',router)


app.listen(port,()=>{
 console.log('listing to port' ,port)
})
