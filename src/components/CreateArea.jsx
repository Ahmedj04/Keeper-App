import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Zoom } from "@material-ui/core";
import { Fab } from "@material-ui/core";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }


  function expand() {
    setExpanded(true);
  }

  function submitNote(event) {
    if (note.title === "" && note.content === "") {
      // alert("Please enter a title or a content")
      toast.error("Please enter a title or a content", { autoClose: 1000 })
    } else {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
      event.preventDefault();
      setExpanded(false)
    }

  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          onClick={expand}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
