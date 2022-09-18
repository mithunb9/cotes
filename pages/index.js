import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { Component, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Icon, IconButton, Avatar, ButtonGroup } from "@mui/material";
import { firestore } from "../firebase/firebase";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import FileItem from "../components/FileItem";
import axios from "axios";
import { Box } from "@mui/system";
import SideBarItems from "../components/SideBarItems";
import Editor from "../components/Editor";

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const onFileClick = (e) => {};

  const addNotebook = () => {
    const newData = data.files.push({
      name: "Untitled",
      type: "notebook",
      pages: [],
    });

    axios.post("/api/data?user=mithun@mithunb.com&name=asxs");
    window.location.reload(false);
    setData(newData);
  };

  useEffect(() => {
    async function fetchData() {
      if (session) {
        const response = await axios.get("/api/data", {
          params: { user: "mithun@mithunb.com" },
        });

        setData(response.data);
      }
    }

    fetchData();
  }, [session]);

  if (session) {
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
                  <Button onClick={addNotebook}>Add Notebook</Button>
                </ButtonGroup>
              </div>
            </Box>
            <Box className={styles.profile}>
              <Avatar alt={session.user.name} src={session.user.image} />
              <Button variant="contained" onClick={() => signOut()}>
                Sign out
              </Button>
              <div />
              Signed in as <br /> {session.user.name}
            </Box>
          </div>
          {/* titleBar -- has 3 columns like |[TITLE] | [NAV BAR OR UTILITY BAR] | [SESSION INFO] | */}
          <div className={styles.titleBar}>
            <Box className={styles.sidebar}>
              <div>
                <h1>{session.user.name}'s Files</h1>
                {data?.files?.map((file, index) => (
                  <div
                    className={styles.fileItems}
                    key={data.index}
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
            <Box className={styles.folderDisp}>
              <Editor />
            </Box>
            <Box className={styles.profile}></Box>
          </div>
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
