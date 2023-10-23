import React, { useContext ,useEffect,useRef,useState} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(noteContext);
  const { notes,getNotes} = context;
  useEffect(() => {
    getNotes()
   // eslint-disable-next-line
  }, [])
  const updateNote =(currentNote)=>{
    ref.current.click()
    setNote({etitle:currentNote.title,etag:currentNote.tag,edescription:currentNote.description})
  }
  const ref = useRef(null);

  const [note, setNote] = useState({etitle:"",edescription:"",etag:""})
  const handleClick =(e)=>{
    console.log("Updating the note...",note)
    e.preventDefault();  //do not refresh page autometically

   
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote />
     
<button type="button" className= "btn btn-primary d-none" ref = {ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className= "modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className= "modal-dialog">
    <div className= "modal-content">
      <div className= "modal-header">
        <h1 className= "modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className= "btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className= "modal-body">
      <form className="my-3">
  <div className= "mb-3">
    <label htmlFor="title" className= "form-label">Title</label>
    <input type="text" className= "form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
  </div>
  <div className= "mb-3">
    <label htmlFor="tag" className= "form-label">Tag</label>
    <input type="text" className= "form-control" name="etag" id="etag" value={note.etag} onChange={onChange}/>
  </div>
  <div className= "mb-3">
    <label htmlFor="description" className= "form-label">Description</label>
    <input type="text" className= "form-control" name="edescription" id="edescription" value={note.edescription} onChange={onChange}/>
  </div>
</form>
      </div>
      <div className= "modal-footer">
        <button type="button" className= "btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className= "btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
