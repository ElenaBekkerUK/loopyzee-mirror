// src/lib/verifySession.ts
import { getAuth } from "firebase-admin/auth";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin";
import type { NextApiRequest } from "next";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON || "{}") as ServiceAccount;

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export async function verifySession(req: NextApiRequest) {
  const session = req.cookies?.session;
  if (!session) return null;

  try {
    return await getAuth().verifySessionCookie(session, true);
  } catch {
    return null;
  }
}
