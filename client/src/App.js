import React from 'react';
import {Route,Link,BrowserRouter,Switch} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import Home from './components/Home'
import loginForm from './components/loginForm'
import RegisterForm from './components/RegisterForm'
import TaskList from './components/task/TaskList'
import AddTask from './components/task/addtask'
import TaskShow from './components/task/TaskShow'
import TaskEdit from './components/task/TaskEdit';


function App() {
  function handleClick(){
    axios.delete('http://localhost:3040/users/logout',{
      headers:{
        'x-auth':localStorage.getItem('token4')
      }
    })
    .then(response=>{
      localStorage.removeItem('token4')
      // window.location.reload()
      window.location.href='/'
    })
  }
  return (
    <div >
      <BrowserRouter>
      <h2>tasks-to-do</h2>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar " to='/'>home</Link> |
{localStorage.getItem('token4')?

<>

<Link className="navbar " to='/tasks'>tasks</Link> |
<Link  className="navbar " to='#' onClick={handleClick}>logout</Link>

</>:
<>

<Link className="navbar " to='/users/register'>register</Link> |
<Link className="navbar " to='/users/login'>login</Link>

  </>}
  </div>
 <Switch>
<Route path='/' component={Home} exact={true}/>
<Route path='/users/login' component={loginForm}/>
<Route path='/users/register' component={RegisterForm}/>
<Route path='/tasks' component={TaskList} exact={true}/>

<Route path='/tasks/new' component={AddTask} exact={true} />
<Route path='/tasks/edit/:id' component={TaskEdit}/>
<Route path='/tasks/:id' component={TaskShow}/>

</Switch> 
      </BrowserRouter>
    </div>
  );
}

export default App
