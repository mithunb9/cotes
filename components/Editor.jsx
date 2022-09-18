import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import NoteBlock from "../components/NoteBlock";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import axios from "axios";

export default function Notes() {
  const [noteBlocks, setNoteBlocks] = useState([]);

  const save = () => {
    axios.post("/api/notes/save", { noteBlocks });
  };

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
        <Stack className={styles.toprow} direction="row" spacing={2}>
          <Tooltip TransitionComponent={Zoom} color="white" title="Add" arrow>
            <Button
              className={styles.add}
              color="inherit"
              primary="black"
              variant="outlined"
              onClick={onClick}
            >
              Add
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Delete" arrow>
            <Button
              className={styles.delete}
              color="inherit"
              variant="outlined"
              onClick={deleteNote}
            >
              Delete
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Heading" arrow>
            <Button
              className={styles.heading}
              color="inherit"
              variant="outlined"
              onClick={addHeading}
            >
              Heading
            </Button>
          </Tooltip>
          <Select menuColor="lightgrey">
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
          <Tooltip TransitionComponent={Zoom} title="Code" arrow>
            <Button
              className={styles.code}
              color="inherit"
              variant="outlined"
              onClick={addCodeblock}
            >
              Code
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Save" arrow>
            <Button
              className={styles.upload}
              color="inherit"
              variant="outlined"
              component="label"
              onClick={save}
            >
              Save
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
      </div>
    </div>
  );
}
