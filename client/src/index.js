import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'



const store=configureStore()

console.log(store.getState())

store.subscribe(()=>{
    console.log(store.getState())
})

// const ele=(
//     <Provider store={store}>
//         <App/> 
//     </Provider>
// )

ReactDOM.render(<App/>, document.getElementById('root'));

