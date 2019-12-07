import React from 'react'
import Form from './form'
import axios from 'axios'
import {connect} from 'react-redux'

export default class AddTask extends React.Component{
    constructor(){
        super()

    }

handle=(formData)=>{
axios.post('http://localhost:3040/tasks',formData,{headers:{
    "x-auth":localStorage.getItem("token4")
}
})
this.props.history.push('/tasks')
}

    render(){
        return(
            <div>
<Form handle={this.handle}/>
            </div>
        )
    }
}