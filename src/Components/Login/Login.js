import React,{useState,useContext} from 'react';
import {FirebaseContext} from '../../store/firebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';


function Login() {
  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [error, setError] = useState('');

  const {firebase}= useContext(FirebaseContext)

  const history=useHistory()

  const handleLogin =(e)=>{
   e.preventDefault()

  // Clear previous error
  setError('');

  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email)) {
    setError('Email format is wrong');
    return;
  }
   
   firebase.auth().signInWithEmailAndPassword(email,password)
   .then(()=>{
    // alert('Logged In')
    history.push('/')
   })
   .catch((firebaseError) => {
    if (firebaseError.code === 'auth/user-not-found') {
      setError('Email is not found, please signup');
    } else if (firebaseError.code === 'auth/wrong-password') {
      setError('Wrong password');
    } else {
      setError('Miss Match Found');
    }
  });
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <button onClick={()=>{history.push('/signup')}}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
