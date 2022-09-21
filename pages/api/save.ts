import { updateUserFiles } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    updateUserFiles(req.query.user, {
      name: req.query.name,
      contents: [],
      type: "file",
    });
  }
}
