import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");

    const newFile = {
      name: req.query.name,
      type: req.query.type,
      contents: [],
    };

    const fileResult = await collection.insertOne(newFile);
    const id = fileResult.insertedId;

    const userFilter = { _id: req.query.userId };
    const userCollection = db.collection("users");
    const user = await userCollection.findOne(userFilter);

    const userUpdate = { $push: { files: id } };
    const result = await userCollection.updateOne(userFilter, userUpdate);

    console.log(result);

    res.status(200).json({ success: true, result });
  }
}
