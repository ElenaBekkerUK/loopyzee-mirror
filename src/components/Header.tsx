// src/components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import * as s from "./Header.css";

export default function Header() {
  const router = useRouter();
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href="/" className={s.logoLink}>
          <Image
            src="/logo.svg" // или .png
            alt="Loopyzee"
            width={48}
            height={48}
            className={s.logoImage}
            priority
          />
        </Link>

        <nav className={s.nav}>
          {currentUser ? (
            <>
              <Link href="/my-invitations" className={s.navLink}>
                My Invitations
              </Link>
              <button onClick={handleLogout} className={s.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={s.navLink}>
                Login
              </Link>
              <Link href="/auth/register" className={s.navLink}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
