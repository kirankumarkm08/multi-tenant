'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
            <Clock size={16} className="mr-2" />
            Limited Time Offer
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Early Bird Pricing Ends Soon
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Secure your spot at RareEvo 2025 with exclusive early bird pricing. 
            Join the most innovative minds in tech for an unforgettable experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">$299</div>
              <div className="text-gray-500 line-through">$399</div>
              <div className="text-sm text-green-600 font-medium">Save $100</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-lg group" asChild>
              <Link href="/tickets">
                Get Tickets Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
              <Link href="/schedule">View Full Schedule</Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            * Early bird pricing valid until February 1, 2025 or while supplies last
          </p>
        </div>
      </div>
    </section>
  );
}