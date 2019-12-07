const Task=require('../models/task')

module.exports.list=(req,res)=>{
    Task.find({userId:req.user._id}).populate('label._id')
    .then(tasks=>{
        res.json(tasks)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.archieved=(req,res)=>{
    Task.find({userId:req.user._id,archieved:true})
    .then(archived=>{
        res.json(archived)
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports.create=(req,res)=>{
    const body=req.body
    const task=new Task(body)
    task.userId=req.user._id
    task.save()
    .then(task=>{
        res.json(task)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Task.findOne({userId:req.user._id,_id:id}).populate('label._id')
    .then(task=>{
       task? res.json(task):res.json({})
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Task.findOneAndUpdate({userId:req.user._id,_id:id},body,{new:true,runValidators:true})
    .then(task=>{
        task?res.json(task):res.json({})
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.remove=(req,res)=>{
    const id=req.params.id
    Task.findOneAndDelete({userId:req.user._id,_id:id})
    .then(task=>{
        task?res.json(task):res.json({})
    })
    .catch(err=>{
        res.json(err)
    })
}