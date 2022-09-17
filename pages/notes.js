import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import TextareaAutosize from "react-textarea-autosize";

export default function Notes() {
  const [noteBlocks, setNoteBlocks] = useState([]);

  const onClick = () => {
    setNoteBlocks([...noteBlocks, NoteBlock]);
  };

  const deleteNote = () => {
    setNoteBlocks(noteBlocks.slice(0, -1));
  };

  const addHeading = () => {
    setNoteBlocks([...noteBlocks]);
  };

  return (
    <div>
      <div>
        {noteBlocks.map(() => (
          <div className={styles.notes} key={noteBlocks.index}>
            <TextareaAutosize className={styles.textarea} />
          </div>
        ))}

        <div>
          <button onClick={onClick}>Add</button>
          <button onClick={deleteNote}>Delete</button>
          <button onClick={addHeading}>Heading</button>
        </div>
      </div>
    </div>
  );
}
