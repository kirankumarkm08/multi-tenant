'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockSpeakers } from '@/lib/data/mock-data';
import { Plus, Search, Edit, Trash2, ExternalLink, Twitter, Linkedin, Globe } from 'lucide-react';

export function SpeakersManagement() {
  const [speakers] = useState(mockSpeakers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search speakers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Speaker
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker) => (
          <Card key={speaker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
              </div>
              <CardTitle className="text-lg">{speaker.name}</CardTitle>
              <p className="text-sm text-gray-600">{speaker.title}</p>
              <p className="text-sm font-medium text-blue-600">{speaker.company}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {speaker.bio}
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Sessions:</h4>
                  <div className="space-y-1">
                    {speaker.sessions.map((session, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {session}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  {speaker.social.twitter && (
                    <Button variant="ghost" size="sm" className="p-2">
                      <Twitter size={16} className="text-blue-400" />
                    </Button>
                  )}
                  {speaker.social.linkedin && (
                    <Button variant="ghost" size="sm" className="p-2">
                      <Linkedin size={16} className="text-blue-600" />
                    </Button>
                  )}
                  {speaker.social.website && (
                    <Button variant="ghost" size="sm" className="p-2">
                      <Globe size={16} className="text-gray-600" />
                    </Button>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="ghost" size="sm">
                    <ExternalLink size={16} className="mr-2" />
                    View Profile
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}