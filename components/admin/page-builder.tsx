'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DragDropCanvas } from '@/components/admin/drag-drop-canvas';
import { ComponentsPalette } from '@/components/admin/components-palette';
import { PagePreview } from '@/components/admin/page-preview';
import { ComponentEditor } from '@/components/admin/component-editor';
import { PageManager } from '@/components/admin/page-manager';
import { Save, Eye, Undo, Redo, Plus, Settings } from 'lucide-react';

export function PageBuilder() {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [pageComponents, setPageComponents] = useState([
    { id: '1', type: 'hero', props: { title: 'Welcome to RareEvo', subtitle: 'The ultimate tech conference' } },
    { id: '2', type: 'features', props: { title: 'Why Attend?', items: [] } }
  ]);
  const [pages, setPages] = useState([
    { id: 'home', name: 'Homepage', slug: '/', status: 'published' },
    { id: 'about', name: 'About', slug: '/about', status: 'draft' },
    { id: 'speakers', name: 'Speakers', slug: '/speakers', status: 'published' },
    { id: 'tickets', name: 'Tickets', slug: '/tickets', status: 'published' }
  ]);

  const handleSave = () => {
    // Save page configuration
    console.log('Saving page:', selectedPage, pageComponents);
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
  };

  const handleComponentUpdate = (componentId: string, newProps: any) => {
    setPageComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, props: { ...comp.props, ...newProps } }
          : comp
      )
    );
  };

  const handlePageChange = (pageId: string) => {
    setSelectedPage(pageId);
    // Load page-specific components
    // In a real app, this would fetch from API
    setPageComponents([
      { id: '1', type: 'hero', props: { title: 'Welcome to RareEvo', subtitle: 'The ultimate tech conference' } },
      { id: '2', type: 'features', props: { title: 'Why Attend?', items: [] } }
    ]);
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Label htmlFor="page-select">Page:</Label>
            <Select value={selectedPage} onValueChange={handlePageChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map(page => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.name} ({page.slug})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Undo size={16} className="mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm">
              <Redo size={16} className="mr-2" />
              Redo
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-2" />
            New Page
          </Button>
          <Button variant="outline" onClick={() => setActiveTab('preview')}>
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="mb-4">
          <TabsTrigger value="builder">Page Builder</TabsTrigger>
          <TabsTrigger value="pages">Page Manager</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-3">
              <ComponentsPalette />
            </div>
            <div className="col-span-6">
              <DragDropCanvas 
                components={pageComponents}
                onComponentsChange={setPageComponents}
                selectedComponent={selectedComponent}
                onComponentSelect={handleComponentSelect}
              />
            </div>
            <div className="col-span-3">
              <ComponentEditor
                selectedComponent={selectedComponent}
                components={pageComponents}
                onComponentUpdate={handleComponentUpdate}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="h-full">
          <PageManager 
            pages={pages}
            onPagesChange={setPages}
            selectedPage={selectedPage}
            onPageSelect={setSelectedPage}
          />
        </TabsContent>

        <TabsContent value="preview" className="h-full">
          <PagePreview components={pageComponents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}