import { updateNotebook } from "../../firebase/firebase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    updateNotebook(req.query.user, {
      name: req.query.name,
      pages: [],
      type: "notebook",
    });
  }
}
