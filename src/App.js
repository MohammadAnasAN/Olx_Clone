import React,{useEffect,useContext} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';

import Create from './Pages/Create';
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import View from './Pages/ViewPost';
import Post from './store/PostContext'

import { AuthContext, FirebaseContext } from './store/firebaseContext';

function App() {
 
  // const {user,setUser}=useContext(AuthContext)
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)

  useEffect(()=>{
    // console.log(user)
    //onAuthStateChanged is used for checking is the user is login or not, user undengil athine statel eduth vekkunnu(setuser context pagele componentil ninnu ayachath)
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })


  return (
    <div>

  <Post>   
      <Router>

        <Route exact path={'/'}> 
          <Home />
        </Route>

        <Route path={'/signup'}> 
          <SignUp />
        </Route>

        <Route path={'/login'}> 
          <Login />
        </Route>

        <Route path={'/view'}> 
          < View/>
        </Route>

        <Route path={'/create'}> 
          <Create />
        </Route>

      </Router>

   </Post>  
    
   </div>
  );
}

export default App;
