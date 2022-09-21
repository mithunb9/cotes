import { getUser, updateUserFiles } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.user === undefined) {
      res.status(200).json({ error: "User not found" });
    } else {
      const data = await getUser(req.query.user);
      console.log(data);
      res.status(200).json(data);
    }
  }
}
