const bruh = {
  user: "pranavbalu",
  files: [
    {
      type: "folder",
      name: "Mithun",
      contents: [],
    },
    {
      type: "notebook",
      name: "Bruh",
      pages: [
        {
          title: "bruh",
          content: [
            { type: "heading", content: "Sample Heading" },
            { type: "heading", content: "Sample Heading" },
          ],
        },
      ],
    },
    {},
  ],
};
const bruh2 = {
  user: "mithunb",
  files: [
    {
      type: "folder2",
      name: "Mithun2",
      contents: [],
    },
    {
      type: "notebook2",
      name: "Bruh2",
      pages: [
        {
          title: "bruh2",
          content: [
            { type: "heading2", content: "Sample Heading2" },
            { type: "heading2", content: "Sample Heading2" },
          ],
        },
      ],
    },
  ],
};

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const { getFirestore } = require("firebase/firestore");
const { useSession } = require("next-auth/react");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
console.log("Firebase initialized");
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const { collection, addDoc, getDocs } = require("firebase/firestore");
const { doc, deleteDoc, setDoc } = require("firebase/firestore");

const addNotebook = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), bruh);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//module.exports(addPost);
//addNotebook(bruh);
//addNotebook(bruh2);
const delNotebook = async () => {
  await deleteDoc(doc(db, "users", "yjOt1A5ieYZIx0UpWhcA"));
};

delNotebook();
