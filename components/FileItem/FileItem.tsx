import FolderIcon from "@mui/icons-material/Folder";
import BookIcon from "@mui/icons-material/Book";
import styles from "FileItem.module.css";
import React from "react";

export default function FileItem(props) {
  const handleClick = () => {};

  if (props.type === "folder") {
    return (
      <div onClick={handleClick}>
        <FolderIcon className={styles.folder} />
        <h1>{props.name}</h1>
      </div>
    );
  } else {
    return (
      <div onClick={handleClick}>
        <BookIcon className={styles.file} />
        <h1>{props.name}</h1>
      </div>
    );
  }
}
