const mongoose =require('mongoose')
const Schema =mongoose.Schema

const tashSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date
    },
    status:{
        type:String,
    required:true
},
    label:[
        {_id:{
        type:Schema.Types.ObjectId,
        ref:'Label',
        required:true
    }
        }],
    archieved:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date
    }
})

const Task=mongoose.model('Task',tashSchema)

module.exports=Task