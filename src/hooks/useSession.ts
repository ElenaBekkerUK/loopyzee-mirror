

// loopyzee/src/hooks/useSession.ts
import { useQuery } from "@tanstack/react-query";
import type { SessionData } from "@/types/user";

export function useSession() {
  return useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: async (): Promise<SessionData> => {
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) throw new Error("unauthenticated");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
