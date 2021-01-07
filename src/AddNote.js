import React, { useState } from 'react'
import axios from 'axios'
import { Button, Paper } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

function AddNote(props) {

    const { addItem } = props 

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleChange = (e) => {
        const attr = e.target.name

        if(attr === 'title') {
            setTitle(e.target.value)
        } else {
            setBody(e.target.value)
        }
    }

    const runValidations = () => {
        //title
        if(title.trim().length === 0) {
            errors.title = 'title is required'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            
            
            const formData = {
                title: title,
                body: body
            }

            const data = JSON.parse(localStorage.getItem('token'))
            
            axios.post('https://dct-user-auth.herokuapp.com/api/notes', formData ,{
                headers: { 'x-auth' : data.token}
            })
            .then((response) => {
                const result = response.data
                addItem(result)
            })
            .catch((err) => {
                alert(err.message)
            })

            setTitle('')
            setBody('')

        } else {
            console.log('form errors', errors)
            setFormErrors(errors)
        }

    }

    return (
        <div className='formDiv'>
            <Paper elevation={3}>
                <h1>Add Note</h1>
                <form onSubmit={handleSubmit}>
                    {/* <input type='text' placeholder='title' value={title} onChange={handleChange}
                    name='title'/> <br /> */}
                    <TextField 
                            variant='outlined' 
                            label='Title' 
                            value={title} 
                            onChange={handleChange} 
                            name='title'
                            error={formErrors.title && <span>{formErrors.title}</span>}
                    /><br />
                    {formErrors.title && <span style={{color:'red'}}> { formErrors.title } </span>}<br />
                    {/* <textarea placeholder='body' value={body} onChange={handleChange} name='body'></textarea><br /><br /> */}
                    <TextField 
                            variant='outlined' 
                            label='Body' 
                            value={body} 
                            onChange={handleChange} 
                            name='body'
                    /><br /><br />
                    <Button variant="contained" color="primary" type='submit'>Save</Button><br />
                    {/* <Button variant="contained" color="secondary" onClick={() => {
                            resetForm()
                        }}>
                            Cancel
                    </Button> */}
                    {/* <input type='submit' value='save'/> */}
                </form>
            </Paper>
        </div>
    )
}

export default AddNote
