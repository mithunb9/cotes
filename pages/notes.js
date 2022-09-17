import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import NoteBlock from "../components/NoteBlock";

export default function Notes() {
  const [noteBlocks, setNoteBlocks] = useState([]);

  const onClick = () => {
    setNoteBlocks([...noteBlocks, { type: "text", content: "" }]);
  };

  const deleteNote = () => {
    setNoteBlocks(noteBlocks.slice(0, -1));
  };

  const addHeading = () => {
    setNoteBlocks([...noteBlocks, { type: "heading", content: "" }]);
  };

  return (
    <div>
      <div>
        {noteBlocks.map((data) => (
          <div className={styles.notes} key={noteBlocks.index}>
            <NoteBlock type={data.type} content={data.content} />
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
