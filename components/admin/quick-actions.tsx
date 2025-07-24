'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Mail, QrCode, FileText, Users, Settings } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    title: 'Add New Event',
    description: 'Create a new event edition',
    icon: Plus,
    href: '/admin/events/new',
    color: 'blue'
  },
  {
    title: 'Send Newsletter',
    description: 'Send update to attendees',
    icon: Mail,
    href: '/admin/email',
    color: 'green'
  },
  {
    title: 'QR Scanner',
    description: 'Check-in attendees',
    icon: QrCode,
    href: '/admin/scanner',
    color: 'purple'
  },
  {
    title: 'Generate Report',
    description: 'Export analytics data',
    icon: FileText,
    href: '/admin/reports',
    color: 'orange'
  },
  {
    title: 'Manage Speakers',
    description: 'Add or edit speakers',
    icon: Users,
    href: '/admin/speakers',
    color: 'pink'
  },
  {
    title: 'Site Settings',
    description: 'Update configuration',
    icon: Settings,
    href: '/admin/settings',
    color: 'gray'
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                asChild
              >
                <Link href={action.href}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`text-${action.color}-600`} size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-gray-500">{action.description}</div>
                    </div>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}