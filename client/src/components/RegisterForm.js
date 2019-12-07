import React from 'react'
import axios from 'axios'

class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            email:''
           
        }
    }
handleChange=(e)=>{
this.setState({
   [e.target.name]:e.target.value
})
}

handleSubmit=(e)=>{
    e.preventDefault()
    const formData=this.state
    console.log(formData)
    
 
axios.post('http://localhost:3040/users/register' ,formData)
.then(response=>{
    console.log(response.data)
    if(response.data._id){
        this.props.history.push('/users/login')
    }else{
        alert(response.data.message)
    }
   
}).catch(err=>{
 console.log(err)
})

}
    render(){
        return(
            <div>
                <h3>register</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>username <input type='text' value={this.state.username} onChange={this.handleChange} name='username'/></label><br/>

                    <label>email <input type='text' value={this.state.email} onChange={this.handleChange} name='email'/></label><br/>

                    <label>password <input type='text' value={this.state.password} onChange={this.handleChange} name='password'/></label><br/>

                    

                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default RegisterForm