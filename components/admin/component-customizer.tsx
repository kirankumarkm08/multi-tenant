'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ComponentCustomization } from '@/lib/types/theme';
import { 
  Settings, 
  Palette, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Smartphone,
  Monitor,
  Tablet,
  Play,
  RotateCcw,
  Copy,
  Trash2
} from 'lucide-react';

interface ComponentCustomizerProps {
  component: ComponentCustomization;
  onUpdate: (component: ComponentCustomization) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function ComponentCustomizer({ component, onUpdate, onDuplicate, onDelete }: ComponentCustomizerProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const updateComponent = (path: string, value: any) => {
    const keys = path.split('.');
    const newComponent = { ...component };
    let current: any = newComponent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onUpdate(newComponent);
  };

  const ColorPicker = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono text-sm"
        />
      </div>
    </div>
  );

  const renderContentEditor = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={component.content.title || ''}
                onChange={(e) => updateComponent('content.title', e.target.value)}
                placeholder="Enter hero title"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Textarea
                value={component.content.subtitle || ''}
                onChange={(e) => updateComponent('content.subtitle', e.target.value)}
                placeholder="Enter hero subtitle"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Call to Action Text</Label>
              <Input
                value={component.content.ctaText || ''}
                onChange={(e) => updateComponent('content.ctaText', e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Link</Label>
              <Input
                value={component.content.ctaLink || ''}
                onChange={(e) => updateComponent('content.ctaLink', e.target.value)}
                placeholder="/tickets"
              />
            </div>
            <div className="space-y-2">
              <Label>Background Image URL</Label>
              <Input
                value={component.content.backgroundImage || ''}
                onChange={(e) => updateComponent('content.backgroundImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Video URL (Optional)</Label>
              <Input
                value={component.content.videoUrl || ''}
                onChange={(e) => updateComponent('content.videoUrl', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={component.content.content || ''}
                onChange={(e) => updateComponent('content.content', e.target.value)}
                placeholder="Enter your text content"
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <Select 
                value={component.content.alignment || 'left'} 
                onValueChange={(value) => updateComponent('content.alignment', value)}
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

      case 'image':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={component.content.src || ''}
                onChange={(e) => updateComponent('content.src', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={component.content.alt || ''}
                onChange={(e) => updateComponent('content.alt', e.target.value)}
                placeholder="Descriptive alt text"
              />
            </div>
            <div className="space-y-2">
              <Label>Caption (Optional)</Label>
              <Input
                value={component.content.caption || ''}
                onChange={(e) => updateComponent('content.caption', e.target.value)}
                placeholder="Image caption"
              />
            </div>
            <div className="space-y-2">
              <Label>Link URL (Optional)</Label>
              <Input
                value={component.content.link || ''}
                onChange={(e) => updateComponent('content.link', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={component.content.text || ''}
                onChange={(e) => updateComponent('content.text', e.target.value)}
                placeholder="Click me"
              />
            </div>
            <div className="space-y-2">
              <Label>Link URL</Label>
              <Input
                value={component.content.href || ''}
                onChange={(e) => updateComponent('content.href', e.target.value)}
                placeholder="/tickets"
              />
            </div>
            <div className="space-y-2">
              <Label>Button Style</Label>
              <Select 
                value={component.content.variant || 'primary'} 
                onValueChange={(value) => updateComponent('content.variant', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Button Size</Label>
              <Select 
                value={component.content.size || 'md'} 
                onValueChange={(value) => updateComponent('content.size', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={component.content.openInNewTab || false}
                onCheckedChange={(checked) => updateComponent('content.openInNewTab', checked)}
              />
              <Label>Open in new tab</Label>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <p>No specific content editor available for this component type.</p>
          </div>
        );
    }
  };

  const renderStyleEditor = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Colors</h4>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Background Color"
            value={component.styles.backgroundColor || '#ffffff'}
            onChange={(value) => updateComponent('styles.backgroundColor', value)}
          />
          <ColorPicker
            label="Text Color"
            value={component.styles.textColor || '#000000'}
            onChange={(value) => updateComponent('styles.textColor', value)}
          />
          <ColorPicker
            label="Border Color"
            value={component.styles.borderColor || '#e5e7eb'}
            onChange={(value) => updateComponent('styles.borderColor', value)}
          />
          <ColorPicker
            label="Accent Color"
            value={component.styles.accentColor || '#3b82f6'}
            onChange={(value) => updateComponent('styles.accentColor', value)}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Typography</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select 
              value={component.styles.fontSize || 'base'} 
              onValueChange={(value) => updateComponent('styles.fontSize', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">Extra Small</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
                <SelectItem value="2xl">2X Large</SelectItem>
                <SelectItem value="3xl">3X Large</SelectItem>
                <SelectItem value="4xl">4X Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Font Weight</Label>
            <Select 
              value={component.styles.fontWeight || 'normal'} 
              onValueChange={(value) => updateComponent('styles.fontWeight', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Spacing & Borders</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Padding</Label>
            <Select 
              value={component.styles.padding || 'md'} 
              onValueChange={(value) => updateComponent('styles.padding', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Margin</Label>
            <Select 
              value={component.styles.margin || 'md'} 
              onValueChange={(value) => updateComponent('styles.margin', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Select 
              value={component.styles.borderRadius || 'md'} 
              onValueChange={(value) => updateComponent('styles.borderRadius', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Border Width</Label>
            <Select 
              value={component.styles.borderWidth || '0'} 
              onValueChange={(value) => updateComponent('styles.borderWidth', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1px</SelectItem>
                <SelectItem value="2">2px</SelectItem>
                <SelectItem value="4">4px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Effects</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Shadow</Label>
            <Select 
              value={component.styles.shadow || 'none'} 
              onValueChange={(value) => updateComponent('styles.shadow', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Opacity</Label>
            <div className="space-y-2">
              <Slider
                value={[component.styles.opacity || 100]}
                onValueChange={([value]) => updateComponent('styles.opacity', value)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-gray-500 text-center">{component.styles.opacity || 100}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutEditor = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Layout</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Select 
              value={component.layout.width} 
              onValueChange={(value) => updateComponent('layout.width', value)}
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
          <div className="space-y-2">
            <Label>Alignment</Label>
            <Select 
              value={component.layout.alignment} 
              onValueChange={(value) => updateComponent('layout.alignment', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Background</h4>
        <ColorPicker
          label="Background Color"
          value={component.layout.backgroundColor}
          onChange={(value) => updateComponent('layout.backgroundColor', value)}
        />
        <div className="space-y-2">
          <Label>Background Image</Label>
          <Input
            value={component.layout.backgroundImage || ''}
            onChange={(e) => updateComponent('layout.backgroundImage', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label>Minimum Height</Label>
          <Input
            value={component.layout.minHeight || ''}
            onChange={(e) => updateComponent('layout.minHeight', e.target.value)}
            placeholder="auto"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Animation</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Animation Type</Label>
            <Select 
              value={component.animation.type} 
              onValueChange={(value) => updateComponent('animation.type', value)}
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
          <div className="space-y-2">
            <Label>Duration</Label>
            <Select 
              value={component.animation.duration} 
              onValueChange={(value) => updateComponent('animation.duration', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="150ms">Fast</SelectItem>
                <SelectItem value="300ms">Normal</SelectItem>
                <SelectItem value="500ms">Slow</SelectItem>
                <SelectItem value="1000ms">Very Slow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResponsiveEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Responsive Settings</h4>
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeDevice === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveDevice('mobile')}
          >
            <Smartphone size={16} />
          </Button>
          <Button
            variant={activeDevice === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveDevice('tablet')}
          >
            <Tablet size={16} />
          </Button>
          <Button
            variant={activeDevice === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveDevice('desktop')}
          >
            <Monitor size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={component.responsive[activeDevice]?.hidden || false}
            onCheckedChange={(checked) => updateComponent(`responsive.${activeDevice}.hidden`, checked)}
          />
          <Label>Hide on {activeDevice}</Label>
        </div>

        <div className="space-y-2">
          <Label>Font Size ({activeDevice})</Label>
          <Select 
            value={component.responsive[activeDevice]?.fontSize || 'inherit'} 
            onValueChange={(value) => updateComponent(`responsive.${activeDevice}.fontSize`, value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inherit">Inherit</SelectItem>
              <SelectItem value="xs">Extra Small</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Padding ({activeDevice})</Label>
          <Select 
            value={component.responsive[activeDevice]?.padding || 'inherit'} 
            onValueChange={(value) => updateComponent(`responsive.${activeDevice}.padding`, value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inherit">Inherit</SelectItem>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Text Alignment ({activeDevice})</Label>
          <Select 
            value={component.responsive[activeDevice]?.textAlign || 'inherit'} 
            onValueChange={(value) => updateComponent(`responsive.${activeDevice}.textAlign`, value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inherit">Inherit</SelectItem>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Settings size={18} className="mr-2" />
              Component Customizer
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Customize every aspect of your component
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize">
              {component.type}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onDuplicate}>
              <Copy size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 mx-6 mb-4">
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
            <TabsTrigger value="responsive" className="flex items-center">
              <Smartphone size={14} className="mr-1" />
              Responsive
            </TabsTrigger>
          </TabsList>

          <div className="px-6 pb-6 max-h-96 overflow-y-auto">
            <TabsContent value="content" className="mt-0">
              {renderContentEditor()}
            </TabsContent>

            <TabsContent value="style" className="mt-0">
              {renderStyleEditor()}
            </TabsContent>

            <TabsContent value="layout" className="mt-0">
              {renderLayoutEditor()}
            </TabsContent>

            <TabsContent value="responsive" className="mt-0">
              {renderResponsiveEditor()}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}