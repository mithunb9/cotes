import clientPromise from "../../lib/mongo";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  // @ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "GET") {
    if (req.query.user === undefined) {
      res.status(200).json({ error: "User not found" });
    } else {
      const client = await clientPromise;
      const db = client.db("test");
      const collection = db.collection("users");
      const user = await collection.findOne({ _id: req.query.id });

      console.log(user);
      res.status(200).json(user);
    }
  }
}
