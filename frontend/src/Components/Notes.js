import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from "../Context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes ,editNote} = context;
    let navigate= useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
             getNotes()
        }
        else{
            navigate("/login" ,{replace:true});
        }
            
        // eslint-disable-next-line
    },[])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id:"",etitle:"", edescription:"", etag:""})
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }

    const handleClick = (e)=>{
        console.log("Updating the Note..",note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully","Success")
    }

    const onChange= (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Note</h1>
                <p className='mx-1'>{notes.length===0 && 'No Note to Display'}</p>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}></NoteItem>;
                })};
            </div>
        </div>
    )
}

export default Notes
