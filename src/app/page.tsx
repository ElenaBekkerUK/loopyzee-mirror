// loopyzee > src > app > page.tsx
"use client";


import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TemplateCard } from "@/components/TemplateCard";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import TrendingInvitesSection from "@/components/TrendingInvitesSection";

type Template = {
  id: string;
  title: string;
  imageUrl: string;
};

// 🔧 Вынесем fetcher в отдельную функцию
const fetchTemplates = async (): Promise<Template[]> => {
  const snapshot = await getDocs(collection(db, "templates"));
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Template, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
};

export default function Home() {
  const router = useRouter();

  const { data: templates, isLoading, isError } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
    staleTime: 1000 * 60 * 5, // 5 минут
  });

  return (
    <>
      <Header />
      <Hero />
      <CategoriesSection />
      <HowItWorks />
      <TrendingInvitesSection />

      <section className="bg-background py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Choose a Template
          </h2>

          {isLoading && (
            <p className="text-center text-accent text-sm">Loading templates...</p>
          )}

          {isError && (
            <p className="text-center text-red-500 text-sm">
              Failed to load templates.
            </p>
          )}

          {templates && templates.length === 0 && (
            <p className="text-center text-accent text-sm">No templates found.</p>
          )}

          {templates && templates.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  imageUrl={template.imageUrl}
                  onClick={() => router.push(`/editor/${template.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  );
}

