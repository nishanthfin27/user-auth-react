import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import './App.css'

const Register = (props) => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}
    const [registered, setRegistered] = useState(false)


    const handleInputChange = (e) => {
        const attr = e.target.name

        if(attr === 'username') {
            setUserName(e.target.value)
        } else if(attr === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const resetForm = () => {
        setUserName('')
        setEmail('')
        setPassword('')
    }

    const runValidations = () => {
        //name
        if(userName.trim().length === 0) {
            errors.userName = 'name cannot be blank'
        } else if(userName.trim().length < 5) {
            errors.userName = 'name should have more than 5 characters'
        }

        //email
        if(email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if(!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }

        //password
        if(!(password.length > 8 && password.length < 128)) {
            errors.password = 'password should be between 8 and 128 characters'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                username: userName,
                email: email,
                password: password
            }

            axios.post('https://dct-user-auth.herokuapp.com/users/register',formData)
                .then((response) => {
                    const result = response.data
                    if(result._id) {
                        setRegistered(true)
                        swal("cool", "You have registered successfully!", "success");
                    } else {
                        alert('error in registering')
                    }
                    
                })
                .catch((err) => {
                    alert(err.message)
                })
            
            resetForm()

        } else {
            console.log('form errors', errors)
            setFormErrors(errors)
        }


    }

    return (
        <div className='formDiv'>
            <Paper elevation={3}>
                    {registered && <Redirect to='/login' />}
                    <h1>Register With Us</h1>
                    <form onSubmit={handleSubmit}>

                        {/* <input type='text' value={userName} onChange={handleInputChange} 
                        name='username' placeholder='Enter username'/><br /> */}
                        <TextField 
                            variant='outlined' 
                            label='Username' 
                            value={userName} 
                            onChange={handleInputChange} 
                            name='username'
                            error={formErrors.userName && <span>{formErrors.userName}</span>}
                        /><br />
                        {formErrors.userName && <span style={{color:'red'}}> { formErrors.userName } </span>}<br />

                        {/* <input type='text' value={email} onChange={handleInputChange} name='email'
                        placeholder='Enter email' /><br /> */}
                        <TextField 
                            variant='outlined' 
                            label='Email' 
                            value={email} 
                            onChange={handleInputChange} 
                            name='email'
                            error={formErrors.email && <span>{formErrors.email}</span>}
                        /><br />
                        {formErrors.email && <span style={{color:'red'}}> { formErrors.email } </span>}<br />

                        {/* <input type='text' value={password} onChange={handleInputChange} placeholder='Enter password'/><br /> */}
                        <TextField 
                            variant='outlined' 
                            label='Password' 
                            value={password} 
                            onChange={handleInputChange} 
                            error={formErrors.password && <span>{formErrors.password}</span>}
                        /><br />
                        {formErrors.password && <span style={{color:'red'}}> { formErrors.password } </span>}<br />

                        {/* <input type='submit' value='Register' /> */}
                        <Button variant="contained" color="primary" type='submit' style={{'marginRight' :'16px'}}>
                            Register
                        </Button>

                        {/* <button onClick={() => {
                            resetForm()
                        }}>Cancel</button> */}
                        <Button variant="contained" color="secondary" onClick={() => {
                            resetForm()
                        }}>
                            Cancel
                        </Button>

                    </form>
            </Paper>
        </div>
    )
}

export default Register
