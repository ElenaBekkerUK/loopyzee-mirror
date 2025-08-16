// loopyzee/src/pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  res.setHeader("Set-Cookie", [
    `session=; HttpOnly; Secure; Path=/; Domain=.loopyzee.com; Max-Age=0; SameSite=Lax`,
  ]);

  return res.status(200).json({ success: true });
}
