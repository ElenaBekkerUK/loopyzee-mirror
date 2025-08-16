// loopyzee/src/lib/verifyAppSession.ts
import { cookies } from "next/headers";
import { auth } from "@/lib/firebaseAdmin"; // ✅ используем общий синглтон

export async function verifyAppSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    const decoded = await auth.verifySessionCookie(session, true);
    const user = await auth.getUser(decoded.uid);
    return {
      ...decoded,
      isAdmin: user.customClaims?.isAdmin === true,
    };
  } catch {
    return null;
  }
}
