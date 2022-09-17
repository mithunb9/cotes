import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const output = await runCode(req.body.language, req.body.code);
    res.status(200).json(output);
  }
}

const runCode = async (language, code) => {
  const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: language,
    version: "16.3.0",
    files: [
      {
        name: "main.js",
        content: code,
      },
    ],
  });

  return res.data;
};
