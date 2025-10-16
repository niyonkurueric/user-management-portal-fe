"use client";

import * as React from "react";
import { useUsers } from "@/services/userService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function UsersByRoleDoughnut() {
  const { data: users = [], isLoading } = useUsers();

  const { labels, counts } = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const u of users) {
      const role = String((u as any).role ?? "unknown");
      map.set(role, (map.get(role) ?? 0) + 1);
    }
    const labels = Array.from(map.keys());
    const counts = Array.from(map.values());
    return { labels, counts };
  }, [users]);

  const data = React.useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Users by role",
          data: counts,
          backgroundColor: [
            "rgba(59, 130, 246, 0.6)",
            "rgba(16, 185, 129, 0.6)",
            "rgba(234, 179, 8, 0.6)",
            "rgba(239, 68, 68, 0.6)",
          ],
          borderWidth: 0,
        },
      ],
    }),
    [labels, counts]
  );

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" as const },
        tooltip: { enabled: true },
      },
    }),
    []
  );

  return (
    <div className="w-full" style={{ height: 220 }}>
      <div className="text-sm text-gray-600 mb-3">Users by role</div>
      {isLoading ? (
        <div className="text-sm text-gray-500">Loading…</div>
      ) : (
        <Doughnut options={options as any} data={data} />
      )}
    </div>
  );
}
