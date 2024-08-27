import React, { useContext, useState } from 'react';
import noteContext from "../Context/notes/noteContext";
import './AddNote.css';  // Import the CSS file

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added Successfully", "Success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="note-container">
            <h1 className="note-title">Add a Note</h1>
            <form className="note-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-input" id="title" name='title' onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-input" id="description" name='description' rows="4" onChange={onChange} minLength={5} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-input" id="tag" name='tag' onChange={onChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="note-button" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
