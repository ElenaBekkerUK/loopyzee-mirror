// loopyzee/src/components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Удалить session cookie на сервере
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // Выйти из Firebase
      const auth = getAuth(app);
      await signOut(auth);

      // Перенаправить на login
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 underline hover:text-red-500"
    >
      Logout
    </button>
  );
}
