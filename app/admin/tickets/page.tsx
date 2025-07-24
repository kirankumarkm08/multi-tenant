'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { TicketsManagement } from '@/components/admin/tickets-management';

export default function TicketsAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tickets Management</h1>
          <p className="text-gray-600">Configure and manage ticket types for your events</p>
        </div>
        <TicketsManagement />
      </div>
    </AdminLayout>
  );
}