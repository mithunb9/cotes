import { useState } from "react";

const NoteBlock = () => <textarea></textarea>;

export default function Notes() {
  const [noteBlocks, setNoteBlocks] = useState([NoteBlock]);

  const onClick = () => {
    setNoteBlocks([...noteBlocks, NoteBlock]);
  };

  return (
    <div>
      <button onClick={onClick}>Click me</button>

      {noteBlocks.map((NoteBlock) => (
        <NoteBlock key={noteBlocks.indexOf(NoteBlock)} />
      ))}
    </div>
  );
}
