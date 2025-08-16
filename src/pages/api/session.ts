// src/pages/api/session.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { ServiceAccount } from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON || "{}") as ServiceAccount;

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ CORS — разрешаем из editor.loopyzee.com
  res.setHeader("Access-Control-Allow-Origin", "https://editor.loopyzee.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).end();

  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: "Missing idToken" });

  try {
    const auth = getAuth();
    const decoded = await auth.verifyIdToken(idToken);

    // 🔐 Устанавливаем кастомные claims, если админ
    if (decoded.email === "admin@loopyzee.com") {
      await auth.setCustomUserClaims(decoded.uid, {
        isAdmin: true,
      });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 дней
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const isProd = process.env.NODE_ENV === "production";
    const cookie = `session=${sessionCookie}; HttpOnly; Path=/; Domain=.loopyzee.com; SameSite=None; Max-Age=${
      expiresIn / 1000
    }${isProd ? "; Secure" : ""}`;

    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to create session cookie:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
