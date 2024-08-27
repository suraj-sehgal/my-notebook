import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    
    const [notes , setNotes] = useState([])

   
    // Get all Notes
    const getNotes =async ()=>{
        //API call
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
        });
        const json =await response.json();
        setNotes(json)
    }

    // Add a note
    const addNote =async (title,description,tag)=>{
        //API call
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json =await response.json();
        console.log("Adding a new note",json);
        getNotes();
    }

    // Delete a note
    const deleteNote =async (id)=>{
        console.log("Deleting a note with id"+id);

        // API call
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
        });
        const json =await response.json();
        console.log(json);  
        getNotes();  
    }

    //Edit a note
    const editNote = async (id,title,description,tag) =>{
        // API call
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/updatenote/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);        
        
        for(let index=0;index < notes.length;index++){
            const element= notes[index];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>    
    )
}

export default NoteState