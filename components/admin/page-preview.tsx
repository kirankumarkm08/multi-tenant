'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Component {
  id: string;
  type: string;
  props: any;
}

interface PagePreviewProps {
  components: Component[];
}

export function PagePreview({ components }: PagePreviewProps) {
  const renderComponent = (component: Component) => {
    const getStyleClasses = (props: any) => {
      let classes = '';
      
      // Padding
      switch (props.padding) {
        case 'none': classes += ' p-0'; break;
        case 'small': classes += ' p-4'; break;
        case 'large': classes += ' p-16'; break;
        default: classes += ' p-8';
      }
      
      // Margin
      switch (props.margin) {
        case 'none': classes += ' m-0'; break;
        case 'small': classes += ' my-4'; break;
        case 'large': classes += ' my-16'; break;
        default: classes += ' my-8';
      }
      
      // Width
      switch (props.width) {
        case 'narrow': classes += ' max-w-2xl mx-auto'; break;
        case 'wide': classes += ' max-w-7xl mx-auto'; break;
        case 'container': classes += ' max-w-6xl mx-auto'; break;
        default: classes += ' w-full';
      }
      
      // Center content
      if (props.centerContent) {
        classes += ' text-center';
      }
      
      // Full height
      if (props.fullHeight) {
        classes += ' min-h-screen flex items-center';
      }
      
      return classes;
    };

    const getInlineStyles = (props: any) => {
      const styles: React.CSSProperties = {};
      
      if (props.backgroundColor) {
        styles.backgroundColor = props.backgroundColor;
      }
      
      if (props.textColor) {
        styles.color = props.textColor;
      }
      
      return styles;
    };

    switch (component.type) {
      case 'hero':
        return (
          <section 
            key={component.id} 
            className={`relative ${getStyleClasses(component.props)}`}
            style={getInlineStyles(component.props)}
          >
            {component.props.backgroundImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${component.props.backgroundImage})` }}
              />
            )}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {component.props.title || 'Hero Title'}
              </h1>
              <p className="text-xl mb-8">
                {component.props.subtitle || 'Hero subtitle goes here'}
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {component.props.ctaText || 'Get Started'}
              </button>
            </div>
          </section>
        );
      
      case 'text':
        return (
          <section 
            key={component.id} 
            className={getStyleClasses(component.props)}
            style={getInlineStyles(component.props)}
          >
            <div className="max-w-4xl mx-auto px-6">
              <div className={`prose prose-lg max-w-none text-${component.props.alignment || 'left'}`}>
                <p>{component.props.content || 'Your text content will appear here...'}</p>
              </div>
            </div>
          </section>
        );
      
      case 'speakers':
        return (
          <section 
            key={component.id} 
            className={`bg-gray-50 ${getStyleClasses(component.props)}`}
            style={getInlineStyles(component.props)}
          >
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">
                {component.props.title || 'Our Speakers'}
              </h2>
              {component.props.subtitle && (
                <p className="text-xl text-gray-600 text-center mb-12">
                  {component.props.subtitle}
                </p>
              )}
              <div className={`grid grid-cols-1 md:grid-cols-${component.props.columns || 3} gap-8`}>
                {Array.from({ length: component.props.count || 6 }, (_, i) => i + 1).map(i => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-semibold text-lg">Speaker {i}</h3>
                    <p className="text-gray-600">Industry Expert</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      
      case 'features':
        return (
          <section 
            key={component.id} 
            className={getStyleClasses(component.props)}
            style={getInlineStyles(component.props)}
          >
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">
                {component.props.title || 'Features'}
              </h2>
              <div className={`grid grid-cols-1 md:grid-cols-${component.props.columns || 3} gap-8`}>
                {Array.from({ length: component.props.columns || 3 }, (_, i) => i + 1).map(i => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded"></div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Feature {i}</h3>
                    <p className="text-gray-600">Feature description goes here</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      
      default:
        return (
          <section 
            key={component.id} 
            className={getStyleClasses(component.props)}
            style={getInlineStyles(component.props)}
          >
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">{component.type} Component</h3>
                <p className="text-gray-600">This component will be rendered here</p>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-full overflow-y-auto bg-white">
          {components.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-lg mb-2">No components added yet</div>
                <div className="text-sm">Add components to see the preview</div>
              </div>
            </div>
          ) : (
            <div>
              {components.map(renderComponent)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}