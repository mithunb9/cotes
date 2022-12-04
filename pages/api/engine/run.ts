import piston from "piston-client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const client = piston({ server: "https://emkc.org" });

export default async function handler(req, res) {
  // @ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "POST") {
    const output = await runCode(req.query.language, req.query.code);
    res.status(200).json({ output });
  }
}

const runCode = async (language: string, code: string): Promise<string> => {
  const result = await client.execute(language, code);
  return result.run.output;
};
