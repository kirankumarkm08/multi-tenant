'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { AttendeesManagement } from '@/components/admin/attendees-management';

export default function AttendeesAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Attendees Management</h1>
          <p className="text-gray-600">Manage event attendees and check-in status</p>
        </div>
        <AttendeesManagement />
      </div>
    </AdminLayout>
  );
}