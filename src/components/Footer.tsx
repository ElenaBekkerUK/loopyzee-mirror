// src/components/Footer.tsx
import Link from "next/link";
import * as s from "./Footer.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <p className={s.copyright}>
          © {new Date().getFullYear()} Loopyzee. All rights reserved.
        </p>
        <div className={s.links}>
          <Link href="/terms" className={s.link}>
            Terms
          </Link>
          <Link href="/privacy" className={s.link}>
            Privacy
          </Link>
          <Link href="/contact" className={s.link}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
