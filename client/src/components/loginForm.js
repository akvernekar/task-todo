import React from 'react'
import axios from 'axios'

class loginForm extends React.Component{
    constructor(){
        super()
        this.state={
           email:'',
            password:''
           
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
    
 
axios.post('http://localhost:3040/users/login' ,formData)
.then(response=>{
    if(response.data.hasOwnProperty('errors')){
        console.log(response)
alert(response.data.errors)
    }else{
        console.log(response.data)
        localStorage.setItem('token4',response.data.token)
        this.props.history.push('/')
        window.location.reload()
    }
   
}).catch(err=>{
 console.log(err)
})


}
    render(){
        return(
            <div>
                <h3>login</h3>
                <form onSubmit={this.handleSubmit}>
                


                    <label>email <input type='text' value={this.state.email} onChange={this.handleChange} name='email'/></label><br/>

                    <label>password <input type='password' value={this.state.password} onChange={this.handleChange} name='password'/></label><br/>

                    

                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default loginForm