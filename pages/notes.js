import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import NoteBlock from "../components/NoteBlock";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";

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
        <Stack direction="row" spacing={2}>
          <Tooltip title="Add" arrow>
            <Button
              color="inherit"
              primary="black"
              variant="outlined"
              onClick={onClick}
            >
              Add
            </Button>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <Button color="inherit" variant="outlined" onClick={deleteNote}>
              Delete
            </Button>
          </Tooltip>
          <Tooltip title="Heading" arrow>
            <Button color="inherit" variant="outlined" onClick={addHeading}>
              Heading
            </Button>
          </Tooltip>
          <Tooltip title="Code" arrow>
            <Button color="inherit" variant="outlined" onClick={addCodeblock}>
              Code
            </Button>
          </Tooltip>
        </Stack>
      </div>

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
          <Select>
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
          <button onClick={addCodeblock}>Code</button>
        </div>
      </div>
    </div>
  );
}
