'use client';

import { useTenant } from '@/lib/contexts/tenant-context';
import Link from 'next/link';

export function Footer() {
  const { tenant } = useTenant();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {tenant?.logo ? (
                <img
                  src={tenant.logo}
                  alt={tenant.name}
                  className="h-8 w-auto filter brightness-0 invert"
                />
              ) : (
                <div className="h-8 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    {tenant?.name || 'EventFlow'}
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-400 mb-4">
              The premier event management platform for creating unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Event</h4>
            <ul className="space-y-2">
              <li><Link href="/tickets" className="text-gray-400 hover:text-white transition-colors">Tickets</Link></li>
              <li><Link href="/speakers" className="text-gray-400 hover:text-white transition-colors">Speakers</Link></li>
              <li><Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">Schedule</Link></li>
              <li><Link href="/venue" className="text-gray-400 hover:text-white transition-colors">Venue</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {tenant?.name || 'EventFlow'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}