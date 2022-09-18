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

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [displayData, setDisplaydata] = useState(data);

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
        <div className={styles.profile}>
          <Avatar alt={session.user.name} src={session.user.image} />
          <Button variant="contained" onClick={() => signOut()}>
            Sign out
          </Button>
          Welcome! {session.user.name} <br />
          Signed in as {session.user.email} <br />
        </div>

        <div className={styles.container}>
          <Head>
            <title>Cotes</title>
            <meta
              name="description"
              content="Note Taking App for Programmers"
            />
          </Head>

          <main className={styles.main}>
            <div>
              <h1>{session.user.name}'s Files</h1>
              <div>
                {displayData?.files?.map((file) => (
                  <div key={displayData.index}>
                    <FileItem type={file.type} name={file.name} />
                  </div>
                ))}
              </div>
            </div>
          </main>
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
