// src/components/FinalCTA.tsx
import Link from "next/link";
import * as s from "./FinalCTA.css";

export default function FinalCTA() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.heading}>
          Ready to Make Something Beautiful?
        </h2>
        <p className={s.subtext}>
          Get started now and create invitations that will be remembered.
        </p>
        <Link href="/" className={s.button}>
          Start Designing
        </Link>
      </div>
    </section>
  );
}
