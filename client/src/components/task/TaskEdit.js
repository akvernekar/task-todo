import React from 'react'
import axios from 'axios'
import Form from './form'


export default class TaskEdit extends React.Component{
    constructor(){
        super()
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
        })
    }

    handle=(FormData)=>{
        const id=this.props.match.params.id
        axios.put(`http://localhost:3040/tasks/${id}`,FormData,{
            headers:{
                'x-auth':localStorage.getItem('token4')
            }
        })
        .then(response=>{
            this.props.history.push(`/tasks/${id}`)
        })
    }

    render(){
        console.log(this.state.task)
        return(
            <div>
            {Object.keys(this.state.task).length!=0 && <Form task={this.state.task} handle={this.handle} />}
            </div>
        )
    }
}


