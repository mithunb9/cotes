import { updateUserFiles } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await updateUserFiles(req.query.user, {
      name: req.query.name,
      contents: [],
      type: req.query.type,
    });

    res.status(200).json({ success: true });
  }
}
