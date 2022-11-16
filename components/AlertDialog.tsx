import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thank you for trying Cotes!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This application is currently in heavy beta! Proceed with caution!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            target="_blank"
            href={"https://github.com/mithunb9/cotes"}
            onClick={handleClose}
          >
            Contribute
          </Button>
          <Button onClick={handleClose} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
