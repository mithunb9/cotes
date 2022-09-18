import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { Component, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Icon, IconButton, Avatar } from "@mui/material";
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

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [displayData, setDisplaydata] = useState(data);

  const onFileClick = (file) => {
    console.log(file);
  };

  useEffect(() => {
    async function fetchData() {
      if (session) {
        const response = await axios.get("/api/data", {
          params: { user: session.user.email },
        });

        setData(response.data);
        setDisplaydata(response.data);
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
            <Box className={styles.utilbar}>add util bar here</Box>
            <Box className={styles.profile}>
              <Avatar alt={session.user.name} src={session.user.image} />
              <Button variant="contained" onClick={() => signOut()}>
                Sign out
              </Button>
              <div />
              Signed in as <br /> {session.user.name}
            </Box>
          </div>{" "}
          {/* titleBar -- has 3 columns like |[TITLE] | [NAV BAR OR UTILITY BAR] | [SESSION INFO] | */}
          <div className={styles.titleBar}>
            <Box className={styles.sidebar}>
              <div>
                <h1>{session.user.name}'s Files</h1>
                {displayData?.files?.map((file) => (
                  <div key={displayData.index} onClick={onFileClick(file.name)}>
                    <FileItem type={file.type} name={file.name} />
                  </div>
                ))}{" "}
                {/* display notebooks here */}
              </div>
            </Box>
            <Box className={styles.folderDisp}>add pages inside notebook</Box>
            <Box className={styles.profile}> right </Box>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.homeTitle}>
        CotesApp <br />
        <Button variant="contained" onClick={() => signIn()}>
          Sign in
        </Button>
      </div>
    </>
  );
}
