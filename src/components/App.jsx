import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([])

  const [editNote, setEditNote] = useState({
    edit: false,
    idx: undefined,
    value: undefined
  });

  function addNote(newNote) {
    setNotes((prevNotes) => {
      // return [...prevNotes, newNote];
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id, isPinned) {

    const setNotesFunction = isPinned ? setPinnedNotes : setNotes;

    setNotesFunction((prevNotes) => {
      return prevNotes.filter((noteItem, index) => index !== id);
    });
  }

  return (
    <div>
      <Header />

      <CreateArea onAdd={addNote} />

      {pinnedNotes.length > 0 && <div>
        <h4>Pinned Notes</h4>
        <div className="grid-view">
          {[...pinnedNotes].map((noteItem, index) => {
            return (
              editNote.edit === true && editNote.idx === index && editNote.value === "pinned" ?
                <EditArea
                  key={index}
                  id={index}
                  editNote={editNote}
                  setEditNote={setEditNote}
                  noteItem={noteItem}
                  notes={notes}
                  setNotes={setNotes}
                  onDelete={deleteNote}
                  pinnedNotes={pinnedNotes}
                  setPinnedNotes={setPinnedNotes}

                />
                :
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
                  setEditNote={setEditNote}
                  value="pinned"
                />
            );
          })}
        </div>
      </div>}


      {notes.length > 0 && <div>
        <h4>UnPinned notes</h4>
        <div className="grid-view">
          {[...notes]
            .map((noteItem, index) => {
              return (
                editNote.edit === true && editNote.idx === index && editNote.value === "unpinned" ?
                  <EditArea
                    key={index}
                    id={index}
                    editNote={editNote}
                    setEditNote={setEditNote}
                    noteItem={noteItem}
                    notes={notes}
                    setNotes={setNotes}
                    onDelete={deleteNote}
                    pinnedNotes={pinnedNotes}
                    setPinnedNotes={setPinnedNotes}
                  />
                  :
                  <Note
                    key={index}
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                    setEditNote={setEditNote}
                    value="unpinned"
                  />
              );
            }
            )}
        </div>
      </div>}

      <Footer />
    </div>
  );
}

export default App;

