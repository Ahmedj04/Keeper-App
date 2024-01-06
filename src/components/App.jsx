import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast.error("Note deleted", { autoClose: 1000 })

  }

  // Pagination state for pinned notes
  const itemsPerPagePinned = 6;
  const [currentPagePinned, setCurrentPagePinned] = useState(1);

  // Pagination state for unpinned notes
  const itemsPerPageUnpinned = 6;
  const [currentPageUnpinned, setCurrentPageUnpinned] = useState(1);

  // Calculate indices for the pinned notes slice
  const indexOfLastPinnedNote = currentPagePinned * itemsPerPagePinned;
  const indexOfFirstPinnedNote = indexOfLastPinnedNote - itemsPerPagePinned;
  const currentPinnedNotes = pinnedNotes.slice(indexOfFirstPinnedNote, indexOfLastPinnedNote);

  // Calculate indices for the unpinned notes slice
  const indexOfLastUnpinnedNote = currentPageUnpinned * itemsPerPageUnpinned;
  const indexOfFirstUnpinnedNote = indexOfLastUnpinnedNote - itemsPerPageUnpinned;
  const currentUnpinnedNotes = notes.slice(indexOfFirstUnpinnedNote, indexOfLastUnpinnedNote);


  function handlePageChangePinned(newPage) {
    setCurrentPagePinned(newPage);
  }

  function handlePageChangeUnpinned(newPage) {
    setCurrentPageUnpinned(newPage);
  }

  return (
    <div>
      <Header />

      <CreateArea onAdd={addNote} />

      {pinnedNotes.length > 0 && <div>
        <h4>Pinned Notes</h4>
        <div className="grid-view">
          {[...currentPinnedNotes].map((noteItem, index) => {
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

        {/* Pagination buttons for pinned notes */}
        <div>
          {pinnedNotes.length > itemsPerPagePinned && (
            <div className="btn-container">
              <button
                className="pagination-btn"
                onClick={() => handlePageChangePinned(currentPagePinned - 1)}
                disabled={currentPagePinned === 1}
              >
                Prev
              </button>
              <button
                className="pagination-btn"
                onClick={() => handlePageChangePinned(currentPagePinned + 1)}
                disabled={indexOfLastPinnedNote >= pinnedNotes.length}
              >
                Next
              </button>
            </div>
          )}
        </div>

      </div>}

      {pinnedNotes.length > 0 && <hr />}

      {notes.length > 0 && <div style={{ "padding-top": "10px" }}>
        <h4>{pinnedNotes.length > 0 ? "Others" : " Notes"}</h4>
        <div className="grid-view">
          {[...currentUnpinnedNotes]
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

        {/* Pagination buttons for unpinned notes */}
        <div>
          {notes.length > itemsPerPageUnpinned && (
            <div className="btn-container">
              <button
                className="pagination-btn"
                onClick={() => handlePageChangeUnpinned(currentPageUnpinned - 1)}
                disabled={currentPageUnpinned === 1}
              >
                Prev
              </button>
              <button
                className="pagination-btn"
                onClick={() => handlePageChangeUnpinned(currentPageUnpinned + 1)}
                disabled={indexOfLastUnpinnedNote >= notes.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>}



      <Footer />

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>

  );
}

export default App;

