'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { SpeakersManagement } from '@/components/admin/speakers-management';

export default function SpeakersAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Speakers Management</h1>
          <p className="text-gray-600">Manage speakers and their sessions</p>
        </div>
        <SpeakersManagement />
      </div>
    </AdminLayout>
  );
}