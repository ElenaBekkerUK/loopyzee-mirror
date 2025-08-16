// src/lib/firebaseAdmin.ts
import "server-only";

import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
  type AppOptions,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getStorage, type Storage } from "firebase-admin/storage";

/** Читаем креды из env: либо JSON, либо раздельные поля */
function readAdminCredentials(): {
  projectId: string;
  clientEmail: string;
  privateKey: string;
} {
  const json = process.env.FIREBASE_ADMIN_JSON;
  if (json) {
    try {
      const parsed = JSON.parse(json) as {
        project_id: string;
        client_email: string;
        private_key: string;
      };
      return {
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key,
      };
    } catch {
      throw new Error("FIREBASE_ADMIN_JSON is not valid JSON");
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_ADMIN_JSON or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY."
    );
  }

  // поддержка \n в .env
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  return { projectId, clientEmail, privateKey };
}

/** Один инстанс Admin SDK на рантайм */
function initApp(): App {
  if (getApps().length) return getApp();

  const { projectId, clientEmail, privateKey } = readAdminCredentials();

  const options: AppOptions = {
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    // можно брать из публичного или отдельного приватного env
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      process.env.FIREBASE_STORAGE_BUCKET,
  };

  return initializeApp(options);
}

const app = initApp();

/** Типизированные синглтоны */
export const firestore: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: Storage = getStorage(app);

/** Удобный ярлык на bucket (часто нужен) */
export const bucket = storage.bucket();

/** Совместимость со старыми импортами (алиасы) */
export const adminDb = firestore;
export const adminAuth = auth;
export const adminStorage = storage;
export const adminBucket = bucket;

/** Опционально — экспорт самого app */
export { app };
