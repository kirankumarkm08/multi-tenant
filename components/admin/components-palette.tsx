'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Layout, 
  Type, 
  Image, 
  Grid3x3, 
  Users, 
  Calendar,
  MapPin,
  Star,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

const componentCategories = [
  {
    name: 'Layout',
    components: [
      { type: 'hero', name: 'Hero Section', icon: Layout, description: 'Large banner with title and CTA' },
      { type: 'features', name: 'Features Grid', icon: Grid3x3, description: 'Feature highlights grid' },
      { type: 'cta', name: 'Call to Action', icon: Layout, description: 'Action-focused section' },
    ]
  },
  {
    name: 'Content',
    components: [
      { type: 'text', name: 'Text Block', icon: Type, description: 'Rich text content' },
      { type: 'image', name: 'Image', icon: Image, description: 'Single image with caption' },
      { type: 'gallery', name: 'Image Gallery', icon: Grid3x3, description: 'Multiple images in grid' },
      { type: 'video', name: 'Video', icon: Image, description: 'Embedded video player' },
    ]
  },
  {
    name: 'Event Specific',
    components: [
      { type: 'speakers', name: 'Speakers Grid', icon: Users, description: 'Speaker profiles grid' },
      { type: 'schedule', name: 'Event Schedule', icon: Calendar, description: 'Timeline of events' },
      { type: 'venue', name: 'Venue Info', icon: MapPin, description: 'Location and directions' },
      { type: 'testimonials', name: 'Testimonials', icon: Star, description: 'Customer reviews' },
      { type: 'sponsors', name: 'Sponsors', icon: Grid3x3, description: 'Sponsor logos grid' },
      { type: 'pricing', name: 'Pricing Table', icon: Star, description: 'Ticket pricing options' },
    ]
  }
];

export function ComponentsPalette() {
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {componentCategories.map((category) => (
          <div key={category.name}>
            <h4 className="font-semibold text-gray-900 mb-3">{category.name}</h4>
            <div className="space-y-2">
              {category.components.map((component) => {
                const Icon = component.icon;
                return (
                  <div
                    key={component.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component.type)}
                    className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={16} className="text-gray-600" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {component.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {component.description}
                        </div>
                      </div>
                      <ChevronRight size={12} className="text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}