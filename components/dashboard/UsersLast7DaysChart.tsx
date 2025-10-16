"use client";

import * as React from "react";
import { useUsers } from "@/services/userService";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { countByDayKeys, getLastNDays } from "@/lib/stats";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// Use getLastNDays from `@/lib/stats` which returns DayKey[] with { key, label, date }

export function UsersLast7DaysChart() {
  const { data: users = [], isLoading } = useUsers();
  const days = React.useMemo(() => getLastNDays(7), []);
  const parseCreatedAt = React.useCallback((val: any): Date | null => {
    if (!val && val !== 0) return null;
    // If it's already a Date
    if (val instanceof Date) return val;
    // If it's a number, backend might send seconds or milliseconds.
    if (typeof val === 'number') {
      // If value looks like seconds (10 digits), convert to ms
      if (val < 1e12) return new Date(val * 1000);
      return new Date(val);
    }
    // If it's a string, try to parse
    if (typeof val === 'string') {
      const n = Number(val);
      if (!Number.isNaN(n)) {
        if (n < 1e12) return new Date(n * 1000);
        return new Date(n);
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }, []);

  const counts = React.useMemo(
    () => countByDayKeys(users, days, (u) => (u.createdAt ? parseCreatedAt((u as any).createdAt) : null)),
    [users, days, parseCreatedAt]
  );

  const data = React.useMemo(
    () => ({
      labels: days.map((d) => d.label),
      datasets: [
        {
          label: "Users Created",
          data: counts,
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderRadius: 6,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
        },
      ],
    }),
    [days, counts]
  );

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#4b5563" },
        },
        y: {
          beginAtZero: true,
          grid: { color: "#e5e7eb" },
          ticks: { stepSize: 1, precision: 0, color: "#4b5563" },
        },
      },
    }),
    []
  );


  return (
    <div className="w-full " style={{ height: 320 }}>
      {isLoading ? (
        <div className="text-sm text-gray-500">Loading…</div>
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
}

export default UsersLast7DaysChart;
