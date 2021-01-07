import React from 'react'
import NoteItem from './NoteItem'

function NotesList(props) {
    const { notes, removeItem } = props

    
    return (
        <div>
            {notes.length === 0 ? (
                <h2>No notes found , add your first note.</h2>
            ) : (
                <div>
                    {
                        notes.map((note) => {
                            return <NoteItem 
                                    key={note._id}
                                    {...note}
                                    removeItem={removeItem}
                            />
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default NotesList
