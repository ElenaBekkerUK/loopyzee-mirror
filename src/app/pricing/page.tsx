"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import * as s from "./Pricing.css";

const pricingOptions = [
  { guests: "0–20 гостей", price: 5 },
  { guests: "21–50 гостей", price: 9 },
  { guests: "51–100 гостей", price: 15 },
  { guests: "101–200 гостей", price: 25 },
  { guests: "200+ гостей", price: 35, note: "или индивидуально" },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const draftId = searchParams?.get("draft");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handleContinue = () => {
    if (!selectedPrice || !draftId) return;
    alert(`Вы выбрали тариф $${selectedPrice} (draftId: ${draftId})`);
  };

  if (!draftId) {
    return <div className="p-6 text-center text-red-600">Ошибка: не найден draftId</div>;
  }

  return (
    <div className={s.pricingWrap}>
      <h1 className={s.pricingTitle}>Выберите тариф</h1>

      <iframe
        src={`https://editor.loopyzee.com/preview?draft=${draftId}`}
        width={600}
        height={900}
        style={{ border: "none", borderRadius: 12, margin: "0 auto", display: "block" }}
        loading="lazy"
      />

      <div style={{ marginTop: 32, display: "grid", gap: 20 }}>
        {pricingOptions.map((opt) => (
          <label
            key={opt.price}
            className={`${s.optionCard} ${selectedPrice === opt.price ? s.optionSelected : ""}`}
          >
            <input
              type="radio"
              name="price"
              value={opt.price}
              onChange={() => setSelectedPrice(opt.price)}
              checked={selectedPrice === opt.price}
              style={{ marginRight: 12 }}
            />
            <span style={{ fontSize: 18 }}>
              {opt.guests} — <strong>${opt.price}</strong>{" "}
              {opt.note && (
                <span style={{ fontSize: 14, color: "#7267d9" }}>({opt.note})</span>
              )}
            </span>
          </label>
        ))}
      </div>

      <button
        className={s.continueButton}
        onClick={handleContinue}
        disabled={!selectedPrice}
      >
        Продолжить
      </button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Загрузка...</div>}>
      <PricingContent />
    </Suspense>
  );
}
