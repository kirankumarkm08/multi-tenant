'use client';

import { Button } from '@/components/ui/button';
import { useTenant } from '@/lib/contexts/tenant-context';
import { Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const { tenant } = useTenant();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-gray-100 opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Calendar size={16} className="mr-2" />
              March 15-17, 2025
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {tenant?.name || 'RareEvo Conference'}
              <span className="text-blue-600 block">2025</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join industry leaders, innovators, and visionaries for three days of 
              transformative insights, networking, and cutting-edge technology demonstrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="px-8 py-3 text-lg" asChild>
                <Link href="/tickets">Get Your Tickets</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
                <Link href="/speakers">View Speakers</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Users className="text-blue-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">500+</span>
                <span className="text-sm text-gray-600">Attendees</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="text-blue-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">3</span>
                <span className="text-sm text-gray-600">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="text-blue-600 mb-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">SF</span>
                <span className="text-sm text-gray-600">Location</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Event venue"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce delay-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">Live Now</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-pulse">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">89%</div>
                <div className="text-xs text-gray-600">Sold Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}