import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { Component, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Button,
  Icon,
  IconButton,
  Avatar,
  ButtonGroup,
  Typography,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import FileItem from "../components/FileItem/FileItem";
import axios from "axios";
import { Box } from "@mui/system";
import Editor from "../components/Editor";

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState("");
  const [focus, setFocus] = useState(false);
  const [openField, setOpenField] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onHomeClick = () => {
    setFocus(false);
  };

  const handleClose = () => {
    addNotebook();
    setOpen(false);
  };

  const onFileClick = (e) => {
    setFocus(true);
    setOpenField(data?.files[e].name);
  };

  const onUserSignOut = () => {
    setData(null);
    signOut();
  };

  const addNotebook = () => {
    const newData = data.files.push({
      name: newNotebookName,
      type: "notebook",
      pages: [],
    });

    axios.post(
      "/api/add?user=" +
        session.user.email +
        "&name=" +
        newNotebookName +
        "&type=notebook"
    );

    setData(newData);
  };

  useEffect(() => {
    async function fetchData() {
      if (session && !user) {
        const response = await axios.get("/api/get", {
          params: { user: session.user.email },
        });

        setUser(response.data);
      }
    }

    fetchData();
  }, [session, user]);

  if (session) {
    console.log(user);
    return (
      <>
        <div className={styles.container}>
          <Head>
            <title>Cotes</title>
            <meta
              name="description"
              content="Note Taking App for Programmers"
            />
          </Head>
          <div className={styles.titleBar}>
            <Box className={styles.title}>Cotes_</Box>
            <Box>
              <div className={styles.utilButtons}>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button onClick={onHomeClick}>Home</Button>
                  <Button onClick={handleClickOpen}>Add Notebook</Button>
                </ButtonGroup>
              </div>
            </Box>
            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New notebook</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter a name for your notebook.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    value={newNotebookName}
                    onChange={(e) => setNewNotebookName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Add</Button>
                </DialogActions>
              </Dialog>
            </div>

            <Box className={styles.profile}>
              <Avatar alt={session.user.name} src={session.user.image} />
              <Button variant="contained" onClick={() => onUserSignOut()}>
                Sign out
              </Button>
              <div />
              Signed in as <br /> {session.user.name}
            </Box>
          </div>
          {/* titleBar -- has 3 columns like |[TITLE] | [NAV BAR OR UTILITY BAR] | [SESSION INFO] | */}

          {focus ? (
            <Editor name={setOpenField} data={user} />
          ) : (
            <div className={styles.sidebar}>
              <Box>
                <div>
                  <h1>{session.user.name}'s Files</h1>
                  {user?.files?.map((file, index) => (
                    <div
                      className={styles.fileItems}
                      key={user.index}
                      onClick={() => {
                        onFileClick(index);
                      }}
                    >
                      <FileItem type={file.type} name={file.name} />
                    </div>
                  ))}
                  {/* display notebooks here */}
                </div>
              </Box>
              <Box className={styles.folderDisp}></Box>
              <Box className={styles.profile}></Box>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.homeTitle}>
        Cotes_ <br />
        <Button variant="contained" onClick={() => signIn()}>
          Sign in
        </Button>
      </div>
    </>
  );
}
