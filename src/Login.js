import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import { Button, Paper } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import './App.css'

const Login = (props) => {

    const {loggedIn,setLoggedIn} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleInputChange = (e) => {
        const attr = e.target.name
        
        if(attr === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const runValidations = () => {
        
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
                email: email,
                password: password
            }
    
            resetForm()

            axios.post('https://dct-user-auth.herokuapp.com/users/login',formData)
                .then((response) => {
                    const result = response.data
                    if(Object.keys(result)[0] === 'token'){
                        localStorage.setItem('token',JSON.stringify(result))
                        setLoggedIn(true)
                        swal("Cool!", "You have logged in successfully!", "success")
                    } else {
                        errors.status = 'invalid email or password'
                        setFormErrors(errors)
                    }


                })
                .catch((err) => {
                    alert(err.message)
                })

        } else {
            console.log('form errors', errors)
            setFormErrors(errors)
        }

    }

    return (
        <div className='formDiv'>
            <Paper elevation={3}>
                {loggedIn && <Redirect to='/' />}
                <h1>Login to your account</h1>
                {formErrors.status && <span style={{color:'red'}}> { formErrors.status } </span>}<br /><br />
                <form onSubmit={handleSubmit}>

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
                    {formErrors.password && <span style={{color:'red'}}> { formErrors.password } </span>}<br /><br />

                    {/* <input type='submit' value='Login' /> */}
                    <Button variant="contained" color="primary" type='submit' style={{'marginRight' :'16px'}}>
                            Login
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

export default Login
