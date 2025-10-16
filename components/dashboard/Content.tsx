"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "@/services/userService";
import UsersLast7DaysChart from "@/components/dashboard/UsersLast7DaysChart";
import UsersByRoleDoughnut from "@/components/dashboard/UsersByRoleDoughnut";

const DashboardContent = () => {
  const { data: users = [], isLoading } = useUsers();

  const { totalUsers, last7DaysCount, adminCount, standardUserCount } = (() => {
    const total = users.length;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    let created7 = 0;
    let admins = 0;
    let regulars = 0;
    for (const u of users) {
      const role = String((u as any).role ?? "user");
      if (role === "admin") admins += 1;
      else regulars += 1;
      if (u.createdAt) {
        const created = new Date(u.createdAt);
        if (created >= sevenDaysAgo) created7 += 1;
      }
    }
    return {
      totalUsers: total,
      last7DaysCount: created7,
      adminCount: admins,
      standardUserCount: regulars,
    };
  })();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: isLoading ? "—" : String(totalUsers) },
          { label: "New Users (7d)", value: isLoading ? "—" : String(last7DaysCount) },
          { label: "Admins", value: isLoading ? "—" : String(adminCount) },
          { label: "Standard Users", value: isLoading ? "—" : String(standardUserCount) },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="py-5">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <Badge>{""}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Users Last 7 Days</h2>
          </CardHeader>
          <CardContent>
            <UsersLast7DaysChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Users by Role</h2>
          </CardHeader>
          <CardContent>
            <UsersByRoleDoughnut />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
