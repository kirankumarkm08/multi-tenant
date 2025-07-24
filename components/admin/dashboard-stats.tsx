'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Ticket, DollarSign, Calendar } from 'lucide-react';
import { mockTickets, mockOrders, mockAttendees } from '@/lib/data/mock-data';

export function DashboardStats() {
  const totalTicketsSold = mockTickets.reduce((sum, ticket) => sum + ticket.sold, 0);
  const totalRevenue = mockOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  const totalAttendees = mockAttendees.length;
  const eventDate = new Date('2025-03-15');
  const today = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const stats = [
    {
      title: 'Total Tickets Sold',
      value: totalTicketsSold.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Ticket,
      color: 'blue'
    },
    {
      title: 'Revenue Generated',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Attendees',
      value: totalAttendees.toLocaleString(),
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Days Until Event',
      value: daysUntilEvent.toString(),
      change: '-1',
      trend: 'down',
      icon: Calendar,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 text-${stat.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="flex items-center text-sm">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}