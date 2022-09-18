const bruh = {
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
const { getFirestore, getDoc } = require("firebase/firestore");
const { useSession } = require("next-auth/react");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "cotes-backend",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

console.log("Firebase initialized");
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const { collection, addDoc } = require("firebase/firestore");
const { doc, deleteDoc, setDoc } = require("firebase/firestore");

const updateNotebook = async (user, userPage) => {
  console.log("REACHED");

  try {
    const data = await getNotebook(user);

    const docRef = await setDoc(doc(db, "users", user), {
      files: [...data.files, userPage],
    });
    console.log(user);
    console.log(userPage);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getNotebook = async (user) => {
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return { ...docSnap.data(), user: user };
  } else {
    // doc.data() will be undefined in this case
    return { user: user, files: [] };
  }
};

module.exports = { updateNotebook, getNotebook };
