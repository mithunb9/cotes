import { useState } from "react";
import styles from "../styles/Notes.module.css";

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
        {noteBlocks.map((NoteBlock) => (
          <NoteBlock className={styles.notes} key={noteBlocks.index} />
        ))}
      </div>
    </div>
  );
}
