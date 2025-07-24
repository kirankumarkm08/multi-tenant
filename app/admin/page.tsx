'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { RecentOrders } from '@/components/admin/recent-orders';
import { AttendanceChart } from '@/components/admin/attendance-chart';
import { QuickActions } from '@/components/admin/quick-actions';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your event performance and manage operations</p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <RecentOrders />
      </div>
    </AdminLayout>
  );
}