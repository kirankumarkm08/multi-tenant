'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockEvents } from '@/lib/data/mock-data';
import { Plus, Search, Calendar, MapPin, Users, DollarSign, Edit, Eye, Trash2 } from 'lucide-react';

export function EventsManagement() {
  const [events] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'live':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Create New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl">{event.name}</CardTitle>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-2" />
                  {event.ticketsSold.toLocaleString()} / {event.capacity.toLocaleString()} attendees
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign size={16} className="mr-2" />
                  ${event.revenue.toLocaleString()} revenue
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {Math.round((event.ticketsSold / event.capacity) * 100)}% sold
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}