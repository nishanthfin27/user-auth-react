import axios from 'axios'
import React, {useState, useEffect } from 'react'
import AddNote from './AddNote'
import NotesList from './NotesList'

function MyNotes(props) {
    const [notes, setNotes] = useState([])

    const addItem = (note) => {
        setNotes([...notes, note])
    }

    const removeItem = (id) => {
        const result = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(result)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('token'))
        axios.get('https://dct-user-auth.herokuapp.com/api/notes',{
            headers: { 'x-auth' : data.token}
        })
        .then((response) =>{
            const result = response.data
            setNotes(result)
        })
        .catch((err) => {
            alert(err.message)
        })
    }, [notes])

    return (
        <div>
            <h1>My Notes</h1>
            <NotesList 
                notes={notes}
                removeItem={removeItem}
            />
            <AddNote 
                addItem={addItem}
            />
        </div>
    )
}

export default MyNotes
