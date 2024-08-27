import React, { useContext } from 'react';
import noteContext from "../Context/notes/noteContext";
import './NoteItem.css';  // Import the CSS file

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card note-card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="note-actions">
                        <i className="fa-solid fa-trash delete-icon" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted Successfully", "Success");
                        }}></i>
                        <i className="fa-solid fa-pen-to-square edit-icon" onClick={() => {
                            updateNote(note);
                        }}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
