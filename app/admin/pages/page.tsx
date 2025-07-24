'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { PageBuilder } from '@/components/admin/page-builder';

export default function PagesAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Page Builder</h1>
          <p className="text-gray-600">Design and customize your event pages with drag-and-drop functionality</p>
        </div>
        <PageBuilder />
      </div>
    </AdminLayout>
  );
}