'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Settings, GripVertical } from 'lucide-react';

interface Component {
  id: string;
  type: string;
  props: any;
}

interface DragDropCanvasProps {
  components: Component[];
  onComponentsChange: (components: Component[]) => void;
  selectedComponent?: string | null;
  onComponentSelect?: (componentId: string) => void;
}

export function DragDropCanvas({ 
  components, 
  onComponentsChange, 
  selectedComponent, 
  onComponentSelect 
}: DragDropCanvasProps) {

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    const newComponent: Component = {
      id: Date.now().toString(),
      type: componentType,
      props: getDefaultProps(componentType)
    };

    onComponentsChange([...components, newComponent]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getDefaultProps = (type: string) => {
    switch (type) {
      case 'hero':
        return { title: 'New Hero Section', subtitle: 'Add your subtitle here' };
      case 'text':
        return { content: 'Add your text content here...' };
      case 'speakers':
        return { title: 'Meet Our Speakers', speakers: [] };
      default:
        return {};
    }
  };

  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent === component.id;
    
    return (
      <div
        key={component.id}
        className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onComponentSelect?.(component.id)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <GripVertical size={16} className="text-gray-400 cursor-grab" />
            <span className="text-sm font-medium text-gray-700 capitalize">
              {component.type} Component
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                onComponentsChange(components.filter(c => c.id !== component.id));
              }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        
        <div className={`bg-white p-4 rounded border-2 border-dashed transition-colors ${
          isSelected ? 'border-blue-300' : 'border-gray-200'
        }`}>
          {renderComponentPreview(component)}
        </div>
        
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Selected
          </div>
        )}
      </div>
    );
  };

  const renderComponentPreview = (component: Component) => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">{component.props.title}</h2>
            <p className="text-gray-600">{component.props.subtitle}</p>
          </div>
        );
      case 'text':
        return (
          <div className="py-4">
            <p className="text-gray-700">{component.props.content}</p>
          </div>
        );
      case 'speakers':
        return (
          <div className="py-8">
            <h3 className="text-xl font-semibold text-center mb-6">{component.props.title}</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm">Speaker {i}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="py-8 text-center text-gray-500">
            {component.type} component preview
          </div>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full">
        <div
          className="h-full border-2 border-dashed border-gray-300 rounded-lg p-6 overflow-y-auto"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {components.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-lg mb-2">Start Building Your Page</div>
                <div className="text-sm">Drag components from the palette to get started</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {components.map(renderComponent)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}