const { initializeApp } = require("firebase/app");
const { getFirestore, getDoc } = require("firebase/firestore");
const { doc, setDoc } = require("firebase/firestore");

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

type category = "heading" | "paragraph" | "javascript" | "python";
type type = "notebook" | "folder";

interface User {
  user: string;
  files: File[];
}

interface File {
  name: string;
  contents: Block[];
  type: type;
}

interface Block {
  type: "text" | "code";
  content: string;
  category: category;
}

const updateUserFiles = async (
  user: string,
  userPage: File
): Promise<boolean> => {
  try {
    const data = await getUser(user);

    const docRef = await setDoc(doc(db, "users", user), {
      files: [...data.files, userPage],
    });

    console.log("Document written with ID: ", docRef.id);

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);

    return false;
  }
};

const getUser = async (user): Promise<User> => {
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), user: user };
  } else {
    return { user: user, files: [] };
  }
};

export { updateUserFiles, getUser };
