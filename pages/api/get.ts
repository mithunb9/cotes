import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.user === undefined) {
      res.status(200).json({ error: "User not found" });
    } else {
      const client = await clientPromise;
      const db = client.db("test");
      const collection = db.collection("users");
      const user = await collection.findOne({ email: req.query.email });

      console.log(user);
      res.status(200).json(user);
    }
  }
}
