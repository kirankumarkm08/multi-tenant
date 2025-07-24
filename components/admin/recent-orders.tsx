'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockOrders } from '@/lib/data/mock-data';
import { Eye, Download } from 'lucide-react';

export function RecentOrders() {
  const orders = mockOrders.slice(0, 5); // Show latest 5 orders

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Tickets</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const totalTickets = order.tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
                return (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-blue-600">{order.orderNumber}</td>
                  <td className="py-3 px-2">
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2">{totalTickets}</td>
                  <td className="py-3 px-2 font-medium">${order.totalAmount}</td>
                  <td className="py-3 px-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-3 px-2">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}