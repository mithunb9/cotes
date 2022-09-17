import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import NoteBlock from "../components/NoteBlock";
import { Button } from "@mui/material";

export default function Notes() {
  const [noteBlocks, setNoteBlocks] = useState([]);

  const onClick = () => {
    setNoteBlocks([...noteBlocks, { type: "text", content: "Sample Text" }]);
  };

  const deleteNote = () => {
    setNoteBlocks(noteBlocks.slice(0, -1));
  };

  const addHeading = () => {
    setNoteBlocks([
      ...noteBlocks,
      { type: "heading", content: "Sample Heading" },
    ]);
  };

  const addCodeblock = () => {
    setNoteBlocks([
      ...noteBlocks,
      { type: "code", content: "console.log('Hello World');" },
    ]);
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
          <Button 
            variant="outlined"
            onClick={onClick}>Add</Button>
          <button onClick={deleteNote}>Delete</button>
          <button onClick={addHeading}>Heading</button>
          <button onClick={addCodeblock}>Code</button>
        </div>
      </div>
    </div>
  );
}
