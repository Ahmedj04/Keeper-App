import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { BsFillPinFill } from "react-icons/bs";


function Note(props) {

  function handleClick() {
    let ispinned;
    props.value === "pinned" ? ispinned = true : ispinned = false;
    props.onDelete(props.id, ispinned);
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Use the truncateText function to limit the content to 50 characters
  const truncatedTitle = truncateText(props.title, 10);
  const truncatedContent = truncateText(props.content, 20);

  return (

    <div className="note"
      onClick={() => {
        props.setEditNote(() => {
          return {
            edit: true,
            idx: props.id,
            value: props.value
          }
        })
      }
      }>
      {props.value === "pinned"
        ? <div >
          <h1>{truncatedTitle}</h1>
          <i><BsFillPinFill /></i>
        </div>
        : <h1>{truncatedTitle}</h1>}

      <p>{truncatedContent}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
