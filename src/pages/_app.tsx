//loopyzee/src/pages/_app.tsx
import Header from "@/components/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full bg-background text-text">
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
