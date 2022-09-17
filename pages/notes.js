import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import NoteBlock from "../components/NoteBlock";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

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
          <Stack direction="row" spacing={2}>
            <Button color="inherit" primary="black" variant="outlined" onClick={onClick}>
              Add
            </Button>
            <Button variant="outlined" onClick={deleteNote}>
              Delete
            </Button>
            <Button variant="outlined" onClick={addHeading}>
              Heading
            </Button>
            <Button variant="outlined" onClick={addCodeblock}>
              Code
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
