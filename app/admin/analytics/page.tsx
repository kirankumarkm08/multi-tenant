'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { AnalyticsDashboard } from '@/components/admin/analytics-dashboard';

export default function AnalyticsAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into your event performance</p>
        </div>
        <AnalyticsDashboard />
      </div>
    </AdminLayout>
  );
}