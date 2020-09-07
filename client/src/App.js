import React from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Navbar from "./components/navbar"
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'
import Home from './components/screens/home'
import Myprofile from './components/screens/myprofile'
import UpdatePic  from './components/screens/changepic'
import UserProfile from './components/screens/userprofile'
import Check from './components/screens/check'
//import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
//import {reducer,initialState} from'./reducers/userReducers'

function App(){
 return(
     <BrowserRouter>
     <Navbar/>
     <Route  path="/signup">
     <Signup />
     </Route>
     <Route path="/signin" >
     <Signin/>
       </Route>
       <Route exact path="/" >
     <Home/>
       </Route>  
       <Route path="/profile" >
     <Myprofile/>
       </Route> 
       <Route path="/updatepic" >
     <UpdatePic/>
       </Route>
      <Route path="/userprofile/:email" >
        <UserProfile/>
       </Route> 
       </BrowserRouter>  
 )
}

export default App;
