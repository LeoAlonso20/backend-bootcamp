import './App.css';
import { useState, useEffect } from 'react';
import { getAllNotes } from './services/notes/getAllNotes';
import { createNote } from './services/notes/createNote';

const App = () => {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {

    getAllNotes()
                .then(notes => {
                  setNotes(notes);
                });

  }, []);

  const handleSubmit = (event) => {

    event.preventDefault();

    const noteToAdd = {
      userId : notes.length + 1,
      title : newNote,
      body : newNote
    }

    createNote(noteToAdd)
                .then( noteToAdd => {
                  setNotes([...notes, noteToAdd]);
                });

    setNewNote('');

  };

  const handleChange = (event) => {
    setNewNote(event.target.value)
  };


  return (
    <div className="App">
      {notes.map(note => {
        return <ul key={note.id} >{note.id} - {note.title}</ul>
      })}
      <form onSubmit={handleSubmit} >
        <input onChange={handleChange} value={newNote}/>
        <button type='submit' >Agregar nota</button>
      </form>
    </div>
  );
}

export default App;
