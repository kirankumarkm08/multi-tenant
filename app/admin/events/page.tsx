'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { EventsManagement } from '@/components/admin/events-management';

export default function EventsAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Create and manage your event editions</p>
        </div>
        <EventsManagement />
      </div>
    </AdminLayout>
  );
}