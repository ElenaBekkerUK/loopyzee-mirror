// src/components/TemplateCard.tsx
import Image from "next/image";
import * as s from "./TemplateCard.css";

type TemplateCardProps = {
  title: string;
  imageUrl: string; // ожидаем url превью
  onClick: () => void;
};

export const TemplateCard = ({ title, imageUrl, onClick }: TemplateCardProps) => {
  const hasImage = Boolean(imageUrl);

  return (
    <button onClick={onClick} className={s.card} aria-label={`Open ${title || "template"}`}>
      <div className={s.imageWrapper}>
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={title || "Template preview"}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className={s.image}
            priority={false}
          />
        ) : (
          <div className={s.fallback}>No preview</div>
        )}
      </div>

      <div className={s.content}>
        <h3 className={s.title}>{title || "Untitled"}</h3>
        <p className={s.subtitle}>Tap to customize</p>
      </div>
    </button>
  );
};