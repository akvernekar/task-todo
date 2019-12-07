import React from 'react'
import axios from 'axios'
import moment from 'moment' 
import {Link} from 'react-router-dom'

export default class TaskShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            task:{}
        }
    }

    componentDidMount=()=>{
        const id=this.props.match.params.id
        
        axios.get(`http://localhost:3040/tasks/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token4')
            }
        })
        .then(response=>{
            this.setState({task:response.data})
        }).catch(err=>{
            console.log(err)
        })
    }

    remove=()=>{
        const id=this.props.match.params.id
        axios.delete(`http://localhost:3040/tasks/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token4')
            }
        })
        .then(response=>{
            this.props.history.push('/tasks')
        })
    }

    render(){
       const {task}=this.state
        return(<div className="container">
            <h1>Detail of task</h1>
            
    <h2>title-  {task.title}</h2>
        <h3>Created Date: {Object.keys(task).length && moment(task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h3>
    <h3>label-  {Object.keys(task).length && task.label.map(item=>{
        return(<span>{item._id.name} </span>)
    })}</h3>
    <h2>Due date-  {Object.keys(task).length && moment(task.dueDate).format('MMMM Do YYYY, h:mm:ss a')}</h2>
<h3>status-  {task.status}</h3>

<Link to={`/tasks/edit/${task._id}`}><button style={{'width':'200px'}}  className="btn btn-info btn-lg ">edit</button></Link>

<button style={{'width':'200px'}} className="btn btn-danger btn-lg" onClick={this.remove}>remove</button>
        </div>) 
    }
}