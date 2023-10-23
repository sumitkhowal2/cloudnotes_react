import React ,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial =[]
const [notes, setNotes] = useState(notesInitial)

//Get all Notes
const getNotes = async()=>{
  //TODO :api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYmMyYzg5NTFjN2QxM2QyMWZkMzM3In0sImlhdCI6MTY5NzQzMjk3OX0.GbDiiCUtxsgI-bkz-pmdps9ufuKKQs7IIKNjFjpzBOg"
    }
  });
  const json = await response.json();
  console.log(json);
  setNotes(json)
}
//Add a Note
const addNote =async (title,description,tag) =>{
  //TODO :api call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYmMyYzg5NTFjN2QxM2QyMWZkMzM3In0sImlhdCI6MTY5NzQzMjk3OX0.GbDiiCUtxsgI-bkz-pmdps9ufuKKQs7IIKNjFjpzBOg"
    },
    
    body: JSON.stringify({title,description,tag})
  });
 
  console.log("adding a new note");
  const note={
    "_id": "65354dcebcfbccc46733aa8d",
    "user": "652bc2c8951c7d13d21fd337",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2023-10-22T16:29:02.308Z",
    "__v": 0
  };
  setNotes(notes.concat(note))
}
//Delete Note
const deleteNote= async(id) =>{
  //API call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYmMyYzg5NTFjN2QxM2QyMWZkMzM3In0sImlhdCI6MTY5NzQzMjk3OX0.GbDiiCUtxsgI-bkz-pmdps9ufuKKQs7IIKNjFjpzBOg"
    }
  });
  const json= response.json();
  console.log(json)
  
  console.log("delete  the note with id" + id);
  const newNotes  = notes.filter((note)=>{return note._id!==id});
  setNotes(newNotes);
}
//Edit Note
const editNote = async(id,title,description,tag) =>{
//API call
const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYmMyYzg5NTFjN2QxM2QyMWZkMzM3In0sImlhdCI6MTY5NzQzMjk3OX0.GbDiiCUtxsgI-bkz-pmdps9ufuKKQs7IIKNjFjpzBOg"
  },
  
  body: JSON.stringify({title,description,tag})
});
const json= response.json();

//Logic to edit in client
for (let index = 0; index < notes.length; index++) {
  const element = notes[index];
  if(element._id===id){
    element.title =title;
    element.description =description;
    element.tag =tag;
  }
  
}
}
  return <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>{props.children}</NoteContext.Provider>;
}

export default NoteState;
