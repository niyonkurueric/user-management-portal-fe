import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, BarChart3, Settings, Bell } from 'lucide-react';

const DashboardContent = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-sm text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {(
        [
          { label: 'Total Users', value: '2,543', change: '+12.5%', variant: 'success' },
          { label: 'Active Sessions', value: '1,234', change: '+5.2%', variant: 'success' },
          { label: 'New Signups', value: '89', change: '-2.4%', variant: 'error' },
          { label: 'Revenue', value: '$45.2k', change: '+8.1%', variant: 'success' },
        ] as const
      ).map((stat, i) => (
        <Card key={i}>
          <CardContent className="py-5">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <Badge variant={stat.variant}>{stat.change}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'logged in', time: '2 minutes ago' },
              { user: 'Jane Smith', action: 'updated profile', time: '15 minutes ago' },
              { user: 'Bob Johnson', action: 'created account', time: '1 hour ago' },
              { user: 'Alice Williams', action: 'changed password', time: '2 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-5 h-5" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DashboardContent;