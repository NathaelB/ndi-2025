import { useQuery } from "@tanstack/react-query";
import { mockTalents } from "./mock-talents";
import type { Talent } from "./mock-talents";

function fetchTalents(): Promise<Talent[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTalents);
    }, 300);
  });
}

export function useTalents() {
  return useQuery({
    queryKey: ["talents"],
    queryFn: fetchTalents,
    staleTime: 5 * 60 * 1000,
  });
}
