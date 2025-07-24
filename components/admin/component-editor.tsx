'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Palette, Layout, Type, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ComponentCustomizer } from '@/components/admin/component-customizer';
import { ComponentCustomization } from '@/lib/types/theme';

interface Component {
  id: string;
  type: string;
  props: any;
}

interface ComponentEditorProps {
  selectedComponent: string | null;
  components: Component[];
  onComponentUpdate: (componentId: string, newProps: any) => void;
}

export function ComponentEditor({ selectedComponent, components, onComponentUpdate }: ComponentEditorProps) {
  const [activeTab, setActiveTab] = useState('content');
  const component = components.find(c => c.id === selectedComponent);

  if (!selectedComponent || !component) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Settings size={18} className="mr-2" />
            Component Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <p>Select a component to edit its properties</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Convert component to ComponentCustomization format
  const customization: ComponentCustomization = {
    id: component.id,
    type: component.type,
    styles: component.props.styles || {},
    content: component.props,
    layout: {
      width: component.props.width || 'full',
      padding: component.props.padding || 'md',
      margin: component.props.margin || 'md',
      alignment: component.props.alignment || 'left',
      backgroundColor: component.props.backgroundColor || '#ffffff',
      backgroundImage: component.props.backgroundImage,
      minHeight: component.props.minHeight
    },
    responsive: {
      mobile: component.props.responsive?.mobile || {},
      tablet: component.props.responsive?.tablet || {},
      desktop: component.props.responsive?.desktop || {}
    },
    animation: {
      type: component.props.animation || 'none',
      duration: component.props.animationDuration || '300ms',
      delay: component.props.animationDelay || '0ms',
      easing: component.props.animationEasing || 'ease-in-out'
    },
    seo: {
      alt: component.props.alt,
      title: component.props.title,
      description: component.props.description
    }
  };

  const handleCustomizationUpdate = (updatedCustomization: ComponentCustomization) => {
    // Convert back to component format and update
    const updatedProps = {
      ...updatedCustomization.content,
      styles: updatedCustomization.styles,
      width: updatedCustomization.layout.width,
      padding: updatedCustomization.layout.padding,
      margin: updatedCustomization.layout.margin,
      alignment: updatedCustomization.layout.alignment,
      backgroundColor: updatedCustomization.layout.backgroundColor,
      backgroundImage: updatedCustomization.layout.backgroundImage,
      minHeight: updatedCustomization.layout.minHeight,
      responsive: updatedCustomization.responsive,
      animation: updatedCustomization.animation.type,
      animationDuration: updatedCustomization.animation.duration,
      animationDelay: updatedCustomization.animation.delay,
      animationEasing: updatedCustomization.animation.easing,
      alt: updatedCustomization.seo.alt,
      title: updatedCustomization.seo.title,
      description: updatedCustomization.seo.description
    };
    
    onComponentUpdate(selectedComponent, updatedProps);
  };

  const handleDuplicate = () => {
    // Handle component duplication
    console.log('Duplicate component:', selectedComponent);
  };

  const handleDelete = () => {
    // Handle component deletion
    console.log('Delete component:', selectedComponent);
  };

  return (
    <ComponentCustomizer
      component={customization}
      onUpdate={handleCustomizationUpdate}
      onDuplicate={handleDuplicate}
      onDelete={handleDelete}
    />
  );

  const handleUpdate = (key: string, value: any) => {
    onComponentUpdate(selectedComponent, { [key]: value });
  };

  const renderContentEditor = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={component.props.title || ''}
                onChange={(e) => handleUpdate('title', e.target.value)}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={component.props.subtitle || ''}
                onChange={(e) => handleUpdate('subtitle', e.target.value)}
                placeholder="Enter hero subtitle"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-cta">Call to Action Text</Label>
              <Input
                id="hero-cta"
                value={component.props.ctaText || 'Get Started'}
                onChange={(e) => handleUpdate('ctaText', e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="hero-image">Background Image URL</Label>
              <Input
                id="hero-image"
                value={component.props.backgroundImage || ''}
                onChange={(e) => handleUpdate('backgroundImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content">Content</Label>
              <Textarea
                id="text-content"
                value={component.props.content || ''}
                onChange={(e) => handleUpdate('content', e.target.value)}
                placeholder="Enter your text content"
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="text-alignment">Text Alignment</Label>
              <Select 
                value={component.props.alignment || 'left'} 
                onValueChange={(value) => handleUpdate('alignment', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'speakers':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="speakers-title">Section Title</Label>
              <Input
                id="speakers-title"
                value={component.props.title || ''}
                onChange={(e) => handleUpdate('title', e.target.value)}
                placeholder="Meet Our Speakers"
              />
            </div>
            <div>
              <Label htmlFor="speakers-subtitle">Subtitle</Label>
              <Textarea
                id="speakers-subtitle"
                value={component.props.subtitle || ''}
                onChange={(e) => handleUpdate('subtitle', e.target.value)}
                placeholder="Optional subtitle"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="speakers-layout">Layout Style</Label>
              <Select 
                value={component.props.layout || 'grid'} 
                onValueChange={(value) => handleUpdate('layout', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="speakers-count">Number to Display</Label>
              <Input
                id="speakers-count"
                type="number"
                value={component.props.count || 6}
                onChange={(e) => handleUpdate('count', parseInt(e.target.value))}
                min="1"
                max="20"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="features-title">Section Title</Label>
              <Input
                id="features-title"
                value={component.props.title || ''}
                onChange={(e) => handleUpdate('title', e.target.value)}
                placeholder="Why Choose Us?"
              />
            </div>
            <div>
              <Label htmlFor="features-columns">Columns</Label>
              <Select 
                value={component.props.columns?.toString() || '3'} 
                onValueChange={(value) => handleUpdate('columns', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>No specific editor available for this component type.</p>
          </div>
        );
    }
  };

  const renderStyleEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="bg-color">Background Color</Label>
        <div className="flex space-x-2">
          <Input
            id="bg-color"
            type="color"
            value={component.props.backgroundColor || '#ffffff'}
            onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
            className="w-16 h-10 p-1"
          />
          <Input
            value={component.props.backgroundColor || '#ffffff'}
            onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="text-color">Text Color</Label>
        <div className="flex space-x-2">
          <Input
            id="text-color"
            type="color"
            value={component.props.textColor || '#000000'}
            onChange={(e) => handleUpdate('textColor', e.target.value)}
            className="w-16 h-10 p-1"
          />
          <Input
            value={component.props.textColor || '#000000'}
            onChange={(e) => handleUpdate('textColor', e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="padding">Padding</Label>
        <Select 
          value={component.props.padding || 'medium'} 
          onValueChange={(value) => handleUpdate('padding', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="margin">Margin</Label>
        <Select 
          value={component.props.margin || 'medium'} 
          onValueChange={(value) => handleUpdate('margin', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderLayoutEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="width">Width</Label>
        <Select 
          value={component.props.width || 'full'} 
          onValueChange={(value) => handleUpdate('width', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Width</SelectItem>
            <SelectItem value="container">Container</SelectItem>
            <SelectItem value="narrow">Narrow</SelectItem>
            <SelectItem value="wide">Wide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="center-content"
          checked={component.props.centerContent || false}
          onCheckedChange={(checked) => handleUpdate('centerContent', checked)}
        />
        <Label htmlFor="center-content">Center Content</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="full-height"
          checked={component.props.fullHeight || false}
          onCheckedChange={(checked) => handleUpdate('fullHeight', checked)}
        />
        <Label htmlFor="full-height">Full Height</Label>
      </div>

      <div>
        <Label htmlFor="animation">Animation</Label>
        <Select 
          value={component.props.animation || 'none'} 
          onValueChange={(value) => handleUpdate('animation', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fade-in">Fade In</SelectItem>
            <SelectItem value="slide-up">Slide Up</SelectItem>
            <SelectItem value="slide-left">Slide Left</SelectItem>
            <SelectItem value="zoom-in">Zoom In</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Settings size={18} className="mr-2" />
            Edit Component
          </CardTitle>
          <Badge variant="outline" className="capitalize">
            {component.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3 mx-6 mb-4">
            <TabsTrigger value="content" className="flex items-center">
              <Type size={14} className="mr-1" />
              Content
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center">
              <Palette size={14} className="mr-1" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center">
              <Layout size={14} className="mr-1" />
              Layout
            </TabsTrigger>
          </TabsList>

          <div className="px-6 pb-6">
            <TabsContent value="content" className="mt-0">
              {renderContentEditor()}
            </TabsContent>

            <TabsContent value="style" className="mt-0">
              {renderStyleEditor()}
            </TabsContent>

            <TabsContent value="layout" className="mt-0">
              {renderLayoutEditor()}
            </TabsContent>
          </div>
        </Tabs>

        <div className="border-t p-4">
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={() => {
              // Handle component deletion
              console.log('Delete component:', selectedComponent);
            }}
          >
            <Trash2 size={16} className="mr-2" />
            Delete Component
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}