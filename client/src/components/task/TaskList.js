import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default class TaskList extends React.Component{
constructor(){
  super()
  this.state={
    tasks:[]
  }
}
componentDidMount=()=>{
axios.get('http://localhost:3040/tasks',{
  headers:{'x-auth':localStorage.getItem('token4')}
})
.then(response=>{
  this.setState({tasks:response.data})
})
}

archieved=(e)=>{
  axios.put(`http://localhost:3040/tasks/${e.target.value}`,{"archieved":e.target.checked},{
            headers:{
                'x-auth':localStorage.getItem('token4')
            }
        }).then(response=>{
            if(response){
                axios.get('http://localhost:3040/tasks',{
            headers:{
                'x-auth':localStorage.getItem('token4')
            }
        })
        .then(response=>{
            this.setState({tasks:response.data})
        })
         
       
            }
        })
       

}

render(){
  return(
    <div style={{backgroundImage: "url(" + "https://www.fabulousblogging.com/wp-content/uploads/2012/10/bkg-2.png" + ")"}} class="jumbotron jumbotron-fluid">
    <div className="container col-md-8">
<h2>listing tasks {this.state.tasks.length}</h2>
<Link to="/tasks/new"> <button className="btn btn-secondary btn-lg btn-block">add task</button></Link>
  <ol className="card bg-light mb-3 ">{this.state.tasks.length!=0 && this.state.tasks.map(item=>{
    return(
    <div className="card-body">
 <li className="card-title">{item.archieved?<strike><h2><Link to={`/tasks/${item._id}`}>Title- {item.title}</Link></h2></strike>:<h2><Link to={`/tasks/${item._id}`}>Title- {item.title}</Link></h2>}
   <h4 className="card-text">Labels- {item.label.map(item2=>{
    return(<span>{item2._id.name} </span>)
    })}</h4>
  <h2>Due-Date- {moment(item.dueDate).format('MMMM Do YYYY, h:mm:ss a')}</h2></li>
  <h3>Is Completed <input type="checkBox" value={item._id} checked={item.archieved} onChange={this.archieved}/></h3><hr/>
</div>
)
  })}</ol>

    </div>
    </div> )
}
 }
