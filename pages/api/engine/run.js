import axios from "axios";
import piston from "piston-client";

const client = piston({ server: "https://emkc.org" });

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req);
    const output = await runCode(req.body.language, req.body.code);
    res.status(200).json(output);
  }
}

const runCode = async (language, code) => {
  const result = await client.execute(language, code);
  return result.output;
};
