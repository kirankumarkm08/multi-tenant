'use client';

import { Mic, Users, Calendar, Award, Wifi, Coffee } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'World-Class Speakers',
    description: 'Learn from industry leaders and renowned experts sharing cutting-edge insights.'
  },
  {
    icon: Users,
    title: 'Networking Opportunities',
    description: 'Connect with like-minded professionals and build lasting business relationships.'
  },
  {
    icon: Calendar,
    title: 'Interactive Workshops',
    description: 'Hands-on sessions designed to enhance your skills and knowledge.'
  },
  {
    icon: Award,
    title: 'Innovation Showcase',
    description: 'Discover the latest technologies and groundbreaking solutions.'
  },
  {
    icon: Wifi,
    title: 'Tech-Enabled Experience',
    description: 'Seamless digital integration for enhanced attendee experience.'
  },
  {
    icon: Coffee,
    title: 'Premium Catering',
    description: 'Enjoy gourmet meals and networking breaks throughout the event.'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Why Attend RareEvo 2025?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience an unparalleled event designed to inspire, educate, and connect 
            the most innovative minds in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}