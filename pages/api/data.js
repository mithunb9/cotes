// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getNotebook, updateNotebook } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.query.user === undefined) {
    res.status(200).json({ error: "User not found" });
  } else {
    const data = await getNotebook(req.query.user);
    console.log(data);
    res.status(200).json(data);
  }
}
