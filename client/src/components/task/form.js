import React from 'react'
import axios from 'axios'
import Creatable from 'react-select/creatable'

import Datetime from 'react-datetime'
import moment from 'moment'


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]



export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:props.task?props.task.title:"",
            dueDate:props.task?moment(props.task.dueDate).format('DD-MM-YYYY h:mm a'):new Date(),
            status:props.task?props.task.status:"",
            labels:[],
            label:props.task?props.task.label:[],
            options:[],
            createvalue:[],
            selectedvalue:[],
          

        }
    }

    componentDidMount=()=>{
axios.get('http://localhost:3040/labels',{
    headers:{
        'x-auth':localStorage.getItem('token4')
    }
})
.then(response=>{
    const options=[]
response.data.forEach(item=>{
options.push({'value':item._id,'label':item.name})
})

    this.setState({labels:response.data,
    options:options}) 
})
    }


handleChange=(e)=>{
this.setState({
    [e.target.name]:e.target.value
})
}

submit=(e)=>{
e.preventDefault()
// const formData={
//     title:this.state.title,
//     dueDate:this.state.dueDate,
//     status:this.state.status,
//     // label:[{_id:this.state.label}]
//     label:this.state.label,
//     createvalue:this.state.createvalue
    
// }
// console.log(formData)
const d=this.state.createvalue.map(i=>({name:i.label}))

axios.post('http://localhost:3040/labelsall',d,{
    headers:{
        'x-auth':localStorage.getItem('token4')
    }
})
.then(response=>{
    axios.get('http://localhost:3040/labels',{
        headers:{
            'x-auth':localStorage.getItem('token4')
        }
    })
    .then(response=>{
        this.setState({labels:response.data})
    })
})

const s=[]
setTimeout(()=>{
    this.state.labels.map(l=>{
        this.state.selectedvalue.map(l2=>{
        if(l.name==l2.label){
            s.push({_id:l._id})
        }
        })
        this.setState({label:s})
    })
    const formData={
        title:this.state.title,
        dueDate:this.state.dueDate,
        status:this.state.status,
        // label:[{_id:this.state.label}]
        label:this.state.label,
        
        // createvalue:this.state.createvalue
        
    }
    
    this.props.handle(formData)
},2000)

}

handleChange2=(newValue)=>{
console.log(newValue)


const array=[]
if(newValue!=null){
newValue.forEach(item=>{
array.concat({'_id':item.value})

})
const c=newValue.filter(i=>(i.__isNew__==true))
this.setState({label:array,
createvalue:c,
selectedvalue:newValue})


}else{
    this.setState({label:[]})
}
}

handle3=(date)=>{
    console.log(date)
    this.setState({dueDate:date._d})
    
    
}

    render(){
        // console.log(this.state.duedatetime)
        // console.log(this.state.label)
        return(<div style={{backgroundImage: "url(" + "https://www.fabulousblogging.com/wp-content/uploads/2012/10/bkg-2.png" + ")"}} class="jumbotron jumbotron-fluid">
            <div className="container col-md-5 offset-md-2">
                <form onSubmit={this.submit}>
                    
                    <label htmlFor="title" >Title</label><input className="form-control" type='text' value={this.state.title} id="title" name="title" onChange={this.handleChange}/>
                    
                    <br/>
                    <span>Labels <Creatable isMulti name="label" options={this.state.options} onChange={this.handleChange2}/></span> 
                    <br/>
                    
                    {/* <Moment format={'MMMM Do YYYY, h:mm:ss a'} /> */}
               
            
           
                    {/* <label>dueDate<input type='date' value={this.state.dueDate} name="dueDate" onChange={this.handleChange}/></label> */}
                    
                   <span>Status <select value={this.props.task?this.props.task.status:this.state.status} className="form-control " name='status' onChange={this.handleChange}>
                       <option value=''>Select status</option>
                       <option >new</option>
                       <option >in progress</option>
                       <option >completed</option>
                   </select></span>
                   <br/>
                  
                   DueDate-<Datetime open={false} closeOnSelect={true} dateFormat="DD-MM-YYYY" value={this.state.dueDate} onChange={this.handle3} />
               
        {/* <p>labels <select name='label' type='multi' onChange={this.handleChange}>
            <option value=''>select labels</option>
        {this.state.labels.map(item=>{
        return(<option value={item._id}>{item.name}</option>)
        }) */}

        {/* }</select></p> */}
        <input className="btn btn-secondary btn-lg btn-block" type="submit"/>
                </form>
            </div>
            </div> )
    }
}





