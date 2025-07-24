'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockAttendees } from '@/lib/data/mock-data';
import { Search, Download, QrCode, Mail, UserCheck, UserX, Clock } from 'lucide-react';

export function AttendeesManagement() {
  const [attendees] = useState(mockAttendees);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'no-show':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <UserCheck size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'no-show':
        return <UserX size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.ticketType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: attendees.length,
    checkedIn: attendees.filter(a => a.checkInStatus === 'checked-in').length,
    pending: attendees.filter(a => a.checkInStatus === 'pending').length,
    noShow: attendees.filter(a => a.checkInStatus === 'no-show').length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <UserCheck className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Checked In</p>
                <p className="text-2xl font-bold text-green-600">{stats.checkedIn}</p>
              </div>
              <UserCheck className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">No Show</p>
                <p className="text-2xl font-bold text-red-600">{stats.noShow}</p>
              </div>
              <UserX className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <QrCode size={16} className="mr-2" />
            QR Scanner
          </Button>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export List
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendee List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Ticket Type</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Registration</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Order</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{attendee.name}</td>
                    <td className="py-3 px-2 text-gray-600">{attendee.email}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        {attendee.ticketType}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className={getStatusColor(attendee.checkInStatus)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(attendee.checkInStatus)}
                          <span className="capitalize">{attendee.checkInStatus.replace('-', ' ')}</span>
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-gray-600">
                      {new Date(attendee.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-blue-600 font-medium">{attendee.orderNumber}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" title="Send Email">
                          <Mail size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" title="View QR Code">
                          <QrCode size={16} />
                        </Button>
                        {attendee.checkInStatus === 'pending' && (
                          <Button variant="ghost" size="sm" className="text-green-600" title="Check In">
                            <UserCheck size={16} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}