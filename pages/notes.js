import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import TextareaAutosize from "react-textarea-autosize";

const NoteBlock = () => <textarea></textarea>;

export default function Notes() {
  const [noteBlocks, setNoteBlocks] = useState([]);

  const onClick = () => {
    setNoteBlocks([...noteBlocks, NoteBlock]);
  };

  return (
    <div>
      <button onClick={onClick}>Click me</button>

      <div>
        {noteBlocks.map(() => (
          <div className={styles.notes} key={noteBlocks.index}>
            <TextareaAutosize className={styles.textarea} />
          </div>
        ))}
      </div>
    </div>
  );
}
