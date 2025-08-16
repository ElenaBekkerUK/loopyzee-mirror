// src/components/TrendingInvitesSection.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as s from "./TrendingInvitesSection.css";

const trendingInvites = [
  {
    id: 1,
    title: "Summer Pool Party",
    label: "hot",
    image: "/invites/pool-party.png",
    pickedNow: true,
  },
  {
    id: 2,
    title: "Graduation Bash",
    label: "season",
    image: "/invites/graduation.png",
    pickedNow: false,
  },
  {
    id: 3,
    title: "Baby Shower",
    label: "hot",
    image: "/invites/baby-shower.png",
    pickedNow: true,
  },
  {
    id: 4,
    title: "Birthday Picnic",
    label: "new",
    image: "/invites/picnic.png",
    pickedNow: false,
  },
];

// Лайв-счётчик (рандом + auto-increase)
function useLiveCounter(start = 2387) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 2)); // +0 или +1 раз в 2сек
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return count.toLocaleString();
}

// Auto-карусель скролл (типобезопасно для TS)
function useAutoScroll(ref: React.RefObject<HTMLDivElement | null>, speed = 1.2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame: number;
    let direction = 1;
    function step() {
      if (!el) return;
      el.scrollLeft += direction * speed;
      // Infinity scroll
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) direction = -1;
      if (el.scrollLeft <= 0) direction = 1;
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [ref, speed]);
}

export default function TrendingInvitesSection() {
  const count = useLiveCounter();
  const wrapRef = useRef<HTMLDivElement>(null);
  useAutoScroll(wrapRef, 1.1);

  return (
    <section className={s.trendingSection}>
      <div className={s.trendingGlass} />
      <h2 className={s.trendingTitle}>
        Trending Now
        <span className={s.counter}>🎉 {count} sent today</span>
      </h2>
      <div className={s.trendingWrap} ref={wrapRef}>
        {trendingInvites.map((invite) => (
          <div className={s.inviteCard} key={invite.id}>
            {invite.pickedNow && (
              <span className={s.pickedNow}>Picked now</span>
            )}
            <Image
              src={invite.image}
              alt={invite.title}
              className={s.inviteImg}
              width={320}
              height={180}
              style={{ objectFit: "cover" }}
              priority
              draggable={false}
            />
            <div className={s.inviteInfo}>
              <span className={s.inviteLabel}>
                {invite.label === "hot" && "🔥 Hot"}
                {invite.label === "new" && "🆕 New"}
                {invite.label === "season" && "☀️ Summer"}
              </span>
              <div className={s.inviteTitle}>{invite.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
