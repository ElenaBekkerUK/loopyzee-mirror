// loopyzee/src/pages/api/me.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { verifySession } from "@/lib/verifySession";
import { getAuth } from "firebase-admin/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allowedOrigins = [
    "https://editor.loopyzee.com",
    "https://www.editor.loopyzee.com",
  ];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const session = await verifySession(req);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const auth = getAuth();
    const userRecord = await auth.getUser(session.uid);
    const isAdmin =
      userRecord.customClaims?.admin === true || userRecord.customClaims?.isAdmin === true;

    // 🔁 Генерируем новый токен с актуальными claims
    const firebaseToken = await auth.createCustomToken(userRecord.uid, {
      isAdmin: isAdmin,
    });

    return res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      isAdmin,
      firebaseToken,
    });
  } catch (err) {
    console.error("verifySession failed:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
