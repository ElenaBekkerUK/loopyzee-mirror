// src/app/auth/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google Registration
  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/my-invitations");
    } catch (error) {
      console.error(error);
      setError("Google registration failed.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/my-invitations");
    } catch (error) {
      console.error(error);
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Register
        </button>
      </form>

      <div className="my-4 flex items-center">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="mx-3 text-gray-400">or</span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        onClick={handleGoogleRegister}
        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 w-full flex items-center justify-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block">
          <g>
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.5 33 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.4 0 4.7.7 6.7 2.1l6.3-6.3C33.4 5.1 28.9 3.5 24 3.5 12.5 3.5 3.5 12.5 3.5 24S12.5 44.5 24 44.5 44.5 35.5 44.5 24c0-1.3-.1-2.4-.3-3.5z"/>
            <path fill="#34A853" d="M6.3 14.1l7 5.1C15.1 16.4 19.2 13.5 24 13.5c2.4 0 4.7.7 6.7 2.1l6.3-6.3C33.4 5.1 28.9 3.5 24 3.5c-7.7 0-14.2 4.7-17.2 11.6z"/>
            <path fill="#FBBC05" d="M24 44.5c5.5 0 10.1-1.8 13.5-5l-6.3-5.1C29.7 36 27 36 24 36c-5.7 0-10.5-3-12.8-7.5l-7 5.4c3 5.9 9.5 10.6 17.8 10.6z"/>
            <path fill="#EA4335" d="M44.5 24c0-1.3-.1-2.4-.3-3.5H24v8.5h11.7C34.5 33 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.4 0 4.7.7 6.7 2.1l6.3-6.3C33.4 5.1 28.9 3.5 24 3.5c-7.7 0-14.2 4.7-17.2 11.6z"/>
          </g>
        </svg>
        Sign up with Google
      </button>
    </div>
  );
}
