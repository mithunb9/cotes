// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getNotebook, updateNotebook } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.user === undefined) {
      res.status(200).json({ error: "User not found" });
    } else {
      const data = await getNotebook(req.query.user);
      console.log(data);
      res.status(200).json(data);
    }
  } else if (req.method === "POST") {
    const data = await updateNotebook(req.query.user, {
      name: req.query.name,
      pages: [],
      type: "notebook",
    });
    res.status(200).json({ success: true });
  }
}
