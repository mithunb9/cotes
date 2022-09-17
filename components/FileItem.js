import FolderIcon from "@mui/icons-material/Folder";
import styles from "./FileItem.module.css";

export default function FileItem(props) {
  if (props.type === "folder") {
    return (
      <div>
        <FolderIcon id={styles.folder} />
        <h1>{props.name}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    );
  }
}
