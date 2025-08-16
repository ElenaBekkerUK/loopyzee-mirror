// src/app/invite/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import * as styles from "./InvitePage.css";
import clsx from "clsx";

interface Template {
  title: string;
  imageUrl?: string;
  showGuestStats?: boolean;
}
interface RSVPStats {
  yes: number;
  no: number;
  maybe: number;
}

export default function InvitePage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [template, setTemplate] = useState<Template | null>(null);
  const [guestName, setGuestName] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [rsvpStats, setRsvpStats] = useState<RSVPStats | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchTemplate = async () => {
      const snap = await getDoc(doc(db, "templates", id));
      if (snap.exists()) setTemplate(snap.data() as Template);
    };
    const fetchStats = async () => {
      const snap = await getDocs(query(collection(db, "rsvp"), where("templateId", "==", id)));
      const d = snap.docs.map(doc => doc.data());
      setRsvpStats({
        yes: d.filter(r => r.response === "yes").length,
        no: d.filter(r => r.response === "no").length,
        maybe: d.filter(r => r.response === "maybe").length,
      });
    };
    fetchTemplate();
    fetchStats();
  }, [id, response]);

  const handleRSVP = async (resp: "yes" | "no" | "maybe") => {
    if (!guestName.trim() || !id) return;
    await addDoc(collection(db, "rsvp"), {
      templateId: id,
      name: guestName,
      response: resp,
    });
    setResponse(resp);
  };

  if (!template) {
    return (
      <div className={styles.inviteBg}>
        <div className={styles.card}>
          <div className={styles.title}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inviteBg}>
      <div className={styles.card}>
        <h1 className={styles.title}>{template.title}</h1>

        {template.imageUrl && (
          <div className={styles.imageBox}>
            <Image
              src={template.imageUrl}
              alt="Invite image"
              fill
              style={{ objectFit: "cover", borderRadius: "22px" }}
              sizes="(max-width: 480px) 100vw, 420px"
            />
          </div>
        )}

        {template.showGuestStats && rsvpStats && (
          <div className={styles.statsRow}>
            <span>✅ {rsvpStats.yes}</span>
            <span>❌ {rsvpStats.no}</span>
            <span>❓ {rsvpStats.maybe}</span>
          </div>
        )}

        {!response ? (
          <>
            <input
              type="text"
              placeholder="Your name"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              className={styles.input}
              maxLength={36}
              required
            />

            <div className={styles.btnRow}>
              <button
                type="button"
                onClick={() => handleRSVP("yes")}
                className={clsx(styles.rsvpBtn, styles.rsvpYes)}
              >
                ✅ Yes
              </button>
              <button
                type="button"
                onClick={() => handleRSVP("no")}
                className={clsx(styles.rsvpBtn, styles.rsvpNo)}
              >
                ❌ No
              </button>
              <button
                type="button"
                onClick={() => handleRSVP("maybe")}
                className={clsx(styles.rsvpBtn, styles.rsvpMaybe)}
              >
                ❓ Maybe
              </button>
            </div>
          </>
        ) : (
          <div className={styles.thanks}>
            Thank you, <b>{guestName}</b>! Your response:{" "}
            {response === "yes"
              ? "✅ Yes"
              : response === "no"
              ? "❌ No"
              : "❓ Maybe"}
          </div>
        )}

        <div className={styles.small}>
          {response
            ? "We look forward to seeing you!"
            : "Your answer is only visible to the event organizer."}
        </div>
      </div>
    </div>
  );
}
