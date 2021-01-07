import axios from 'axios'
import React, {useState} from 'react'
import { Link, Route } from 'react-router-dom'
import Account from './Account'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import MyNotes from './MyNotes'
import swal from 'sweetalert'
import './App.css'

const App = () => {
  const[loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('token')) ? true : false)


  const data = JSON.parse(localStorage.getItem('token'))

  const logout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    axios.delete('https://dct-user-auth.herokuapp.com/users/logout', {
      headers: { 'x-auth' : data.token}
    })
    .then((respose) => {
      swal("Cool!", "You have logged out successfully!", "success");
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div>      
      <div className='links'>
      <h1>User Auth</h1>
        {loggedIn ? (
          <div className='link'>
            <Link to='/'>Home</Link>  
            <div className='middleOne'><Link to='/account'>Account</Link></div>
            <div className='middleTwo'><Link to='/mynotes'>My Notes</Link></div>
            <Link to='/' onClick={() => {
              logout()
            }}>Logout</Link>
          </div>
        ) : (
          <div className='link'>
            <Link to='/'>Home</Link> 
            <div className='middleOne'><Link to='/register'>Register</Link></div> 
            <Link to='/login'>Login</Link>
          </div>
        )}
      </div>

      <Route exact path='/' render={(props) => {
        return <Home {...props}/>
      }} />

      <Route exact path='/register' render={(props) => {
        return <Register {...props}/>
      }} />

      <Route exact path='/login' render={(props) => {
        return <Login 
                  {...props}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  />
      }} />

      <Route exact path='/account' render={(props) => {
        return <Account {...props}/>
      }} />

      <Route exact path='/mynotes' render={(props) => {
        return <MyNotes {...props} />
      }}/>

    </div>
  )
}

export default App
