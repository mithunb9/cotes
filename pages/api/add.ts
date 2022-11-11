import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection("users");

    const filesCollection = db.collection("files");
    const file = {
      name: req.query.name,
      type: req.query.type,
      contents: [],
    };
    const fileResult = await filesCollection.insertOne(file);
    const fileId = fileResult.insertedId;

    const filter = { email: req.query.user };
    const user = await userCollection.findOne(filter);
    let files = user.files;

    const updateDoc = {
      $set: {
        fileIds: [...files, fileId],
      },
    };

    const result = await userCollection.updateOne(filter, updateDoc);

    res.status(200).json({ success: true });
  }
}
