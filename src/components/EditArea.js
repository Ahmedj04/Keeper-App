import React, { useState, useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { BsPin, BsFillPinFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function EditArea(props) {

    const [isPinned, setIsPinned] = useState(false)

    useEffect(() => {
        setIsPinned(props.pinnedNotes.some(
            (pinnedNote) => pinnedNote === props.noteItem
        ))
    }, [props.noteItem, props.pinnedNotes])

    function handleClick() {
        props.onDelete(props.id, isPinned);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        if (isPinned === true) {
            const newPinnedNotes = [...props.pinnedNotes];
            newPinnedNotes[props.editNote.idx][name] = value;
            props.setPinnedNotes(newPinnedNotes);
        } else {
            const newNotes = [...props.notes];
            newNotes[props.editNote.idx][name] = value;
            props.setNotes(newNotes);
        }
    }

    return (
        <div className="overlay-background">
            <div className="edit-container">
                <form className="edit-note " >
                    <div className="edit-options">
                        <i className="pin"
                            onClick={() => {
                                // Determine if the note is currently pinned by checking if it exists in pinnedNotes, return true or false
                                setIsPinned(props.pinnedNotes.some(
                                    (pinnedNote) => pinnedNote === props.noteItem
                                ))

                                // Create an updated array of pinnedNotes based on the current pinned status
                                const updatedPinnedNotes = isPinned
                                    ? props.pinnedNotes.filter((note) => note !== props.noteItem)
                                    : [...props.pinnedNotes, props.noteItem];

                                // Update the pinnedNotes state with the newly calculated array
                                props.setPinnedNotes(updatedPinnedNotes);

                                // Create an updated array of all notes based on the current pinned status
                                const updatedNotes = isPinned
                                    ? [...props.notes, props.noteItem]
                                    : props.notes.filter((note) => note !== props.noteItem);

                                // Update the notes state with the newly calculated array
                                props.setNotes(updatedNotes);

                                // Reset the edit state to indicate that no note is currently being edited
                                props.setEditNote(() => ({ edit: false, idx: undefined }));


                            }}>
                            {isPinned === true ? <BsFillPinFill /> : <BsPin />}
                        </i>

                        <i className="close"
                            onClick={() =>
                                props.setEditNote(() => { return { edit: false, idx: undefined } })
                            }>
                            <MdOutlineDone color="green" size={"20px"} />
                        </i>

                        <i onClick={handleClick} className="delete"><MdDelete color="red" size={"15px"} /></i>

                    </div>

                    <input
                        name="title"
                        onChange={handleChange}
                        value={props.noteItem.title}
                        placeholder="Title"
                    />
                    <textarea
                        name="content"
                        onChange={handleChange}
                        value={props.noteItem.content}
                        placeholder="Take a note..."
                        // rows={props.noteItem.content.split("\n").length}
                        rows={15}
                    />
                </form>
            </div>
        </div>

    );
}

export default EditArea;




