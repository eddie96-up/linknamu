"use client";

import { useEffect, useRef, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Counts>(() =>
    Object.fromEntries(links.map((l) => [l.id, 0])),
  );
  // 조회 응답이 오기 전에 누른 클릭은 응답값에 더해 주기 위해 따로 기억
  const pendingClicks = useRef<Counts>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { counts: Counts }) => {
        if (cancelled) return;
        const pending = pendingClicks.current;
        pendingClicks.current = {};
        setCounts(
          Object.fromEntries(
            links.map((l) => [l.id, (data.counts[l.id] ?? 0) + (pending[l.id] ?? 0)]),
          ),
        );
      })
      .catch((err) => console.error("[clicks] 클릭 수 조회 실패:", err));
    return () => {
      cancelled = true;
    };
  }, [links]);

  const handleClick = (id: string) => {
    pendingClicks.current[id] = (pendingClicks.current[id] ?? 0) + 1;
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-8 flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
