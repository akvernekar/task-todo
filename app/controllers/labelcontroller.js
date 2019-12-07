const Label=require('../models/labels')


module.exports.list=(req,res)=>{
    Label.find({userId:req.user._id})
    .then(labels=>{
        res.json(labels)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.createall=(req,res)=>{
    const body=req.body
    // const label=new Label(body)
    const Body=body.map(i=>Object.assign(i,{userId:req.user._id}))

    Label.collection.insertMany(Body)
    .then(label=>{
        res.json(label)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const label=new Label(body)
    label.userId=req.user._id
    label.save()
    .then(label=>{
        res.json(label)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Label.findOne({userId:req.user._id,_id:id})
    .then(label=>{
        label?res.json(label):res.json({})
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Label.findOneAndUpdate({userId:req.user._id,_id:id},body,{new:true,runValidators:true})
    .then(label=>{
        label?res.json(label):res.json({})
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.remove=(req,res)=>{
    const id=req.params.id
    Label.findOneAndDelete({userId:req.user._id,_id:id})
    .then(label=>{
        label?res.json(label):res.json({})
    })
    .catch(err=>{
        res.json(err)
    })
}