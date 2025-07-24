'use client';

import { AdminLayout } from '@/components/layouts/admin-layout';
import { BlogManagement } from '@/components/admin/blog-management';

export default function BlogAdmin() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Create and manage blog posts for your event</p>
        </div>
        <BlogManagement />
      </div>
    </AdminLayout>
  );
}