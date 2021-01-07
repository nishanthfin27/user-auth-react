import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import { Paper } from '@material-ui/core'

const NoteItem = (props) => {
    const { title, _id, removeItem} = props 

    const showInfo = (_id) => {
        const data = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`,{
            headers: { 'x-auth' : data.token}
        })
            .then((response) => {
                const result = response.data 
                swal(`${result.title}`, `${result.body}`,'success')
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    
    const handleDelete = (_id) => {
        const confirmRemove = window.confirm('Are you sure?')
        if(confirmRemove) {
            const data = JSON.parse(localStorage.getItem('token'))
            axios.delete(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`,{
            headers: { 'x-auth' : data.token}
            })
                .then((response) => {
                    const result = response.data
                    removeItem(result._id)
                    swal("Cool!", "Deleted note successfully!", "success")
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    return (
        <div className='taskList'>
            <Paper elevation={3}>
                <h3 onClick={() => {
                    showInfo(_id)
                }}> {title} </h3>
                <button onClick={() => {
                    handleDelete(_id)
                }}><DeleteForeverOutlinedIcon /></button>
            </Paper>
        </div>
    )
}

export default NoteItem
