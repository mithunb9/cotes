import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <div className={styles.container}>
        <CodeMirror
          value="console.log('hello world!');"
          height="200px"
          theme="dark"
          extensions={[javascript({ jsx: true })]}
        />

        <Head>
          <title>Cotes</title>
          <meta name="description" content="Note Taking App for Programmers" />
        </Head>

        <main className={styles.main}></main>
      </div>
      </>
    );
  }

  return (
    <>
    Not Signed in <br />
    <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
