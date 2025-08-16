// src/app/auth/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from "firebase/auth";
import { app } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setSessionCookieAndRedirect = async (user: User) => {
    const token = await user.getIdToken();
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
      credentials: "include"
    });

    // Разветвление по email
    if (user.email === "elenstudio1@gmail.com") {
      router.replace("/admin");
    } else {
      router.replace("/my-invitations");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setSessionCookieAndRedirect(result.user);
    } catch {
      setError("Google login failed.");
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await setSessionCookieAndRedirect(result.user);
    } catch {
      setError("Failed to sign in. Check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign in to Loopyzee</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Sign In
        </button>
      </form>
      <div className="my-4 flex items-center">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="mx-3 text-gray-400">or</span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>
      <button
        onClick={handleGoogleLogin}
        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 w-full flex items-center justify-center gap-2"
      >
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
