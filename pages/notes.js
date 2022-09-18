import { useState, useEffect, useRef } from "react";
import styles from "../styles/Notes.module.css";
import NoteBlock from "../components/NoteBlock";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

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
          <Tooltip TransitionComponent={Zoom} color="white" title="Add" arrow>
            <Button
              color="inherit"
              primary="black"
              variant="outlined"
              onClick={onClick}
            >
              Add
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Delete" arrow>
            <Button color="inherit" variant="outlined" onClick={deleteNote}>
              Delete
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Heading" arrow>
            <Button color="inherit" variant="outlined" onClick={addHeading}>
              Heading
            </Button>
          </Tooltip>
          <Select title="Language">
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
          <Tooltip TransitionComponent={Zoom} title="Code" arrow>
            <Button color="inherit" variant="outlined" onClick={addCodeblock}>
              Code
            </Button>
          </Tooltip>
          <Button color="inherit" variant="outlined" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
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
