'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GlobalTheme } from '@/lib/types/theme';
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Monitor, 
  Tablet,
  Save,
  RotateCcw,
  Eye,
  Download,
  Upload
} from 'lucide-react';

interface ThemeEditorProps {
  theme: GlobalTheme;
  onThemeChange: (theme: GlobalTheme) => void;
  onSave: () => void;
  onPreview: () => void;
}

export function ThemeEditor({ theme, onThemeChange, onSave, onPreview }: ThemeEditorProps) {
  const [activeTab, setActiveTab] = useState('colors');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const updateTheme = (path: string, value: any) => {
    const keys = path.split('.');
    const newTheme = { ...theme };
    let current: any = newTheme;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onThemeChange(newTheme);
  };

  const ColorPicker = ({ label, value, onChange, description }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    description?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const FontSelector = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span style={{ fontFamily: option.value }}>{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const fontOptions = [
    { label: 'Inter', value: 'Inter, sans-serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' },
    { label: 'Open Sans', value: 'Open Sans, sans-serif' },
    { label: 'Lato', value: 'Lato, sans-serif' },
    { label: 'Montserrat', value: 'Montserrat, sans-serif' },
    { label: 'Poppins', value: 'Poppins, sans-serif' },
    { label: 'Playfair Display', value: 'Playfair Display, serif' },
    { label: 'Merriweather', value: 'Merriweather, serif' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold">Theme Editor</h2>
          <p className="text-gray-600">Customize your site's appearance and branding</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewDevice('mobile')}
            >
              <Smartphone size={16} />
            </Button>
            <Button
              variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewDevice('tablet')}
            >
              <Tablet size={16} />
            </Button>
            <Button
              variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewDevice('desktop')}
            >
              <Monitor size={16} />
            </Button>
          </div>
          <Button variant="outline" onClick={onPreview}>
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button onClick={onSave}>
            <Save size={16} className="mr-2" />
            Save Theme
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b px-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="colors" className="flex items-center">
                <Palette size={16} className="mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center">
                <Type size={16} className="mr-2" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center">
                <Layout size={16} className="mr-2" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="navbar">Navbar</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <TabsContent value="colors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker
                    label="Primary Color"
                    value={theme.colors.primary}
                    onChange={(value) => updateTheme('colors.primary', value)}
                    description="Main brand color used for buttons, links, and highlights"
                  />
                  <ColorPicker
                    label="Secondary Color"
                    value={theme.colors.secondary}
                    onChange={(value) => updateTheme('colors.secondary', value)}
                    description="Secondary brand color for accents and variations"
                  />
                  <ColorPicker
                    label="Accent Color"
                    value={theme.colors.accent}
                    onChange={(value) => updateTheme('colors.accent', value)}
                    description="Accent color for special elements and CTAs"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Background Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker
                    label="Background"
                    value={theme.colors.background}
                    onChange={(value) => updateTheme('colors.background', value)}
                  />
                  <ColorPicker
                    label="Surface"
                    value={theme.colors.surface}
                    onChange={(value) => updateTheme('colors.surface', value)}
                  />
                  <ColorPicker
                    label="Border"
                    value={theme.colors.border}
                    onChange={(value) => updateTheme('colors.border', value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Text Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker
                    label="Primary Text"
                    value={theme.colors.text.primary}
                    onChange={(value) => updateTheme('colors.text.primary', value)}
                  />
                  <ColorPicker
                    label="Secondary Text"
                    value={theme.colors.text.secondary}
                    onChange={(value) => updateTheme('colors.text.secondary', value)}
                  />
                  <ColorPicker
                    label="Muted Text"
                    value={theme.colors.text.muted}
                    onChange={(value) => updateTheme('colors.text.muted', value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker
                    label="Success"
                    value={theme.colors.success}
                    onChange={(value) => updateTheme('colors.success', value)}
                  />
                  <ColorPicker
                    label="Warning"
                    value={theme.colors.warning}
                    onChange={(value) => updateTheme('colors.warning', value)}
                  />
                  <ColorPicker
                    label="Error"
                    value={theme.colors.error}
                    onChange={(value) => updateTheme('colors.error', value)}
                  />
                  <ColorPicker
                    label="Info"
                    value={theme.colors.info}
                    onChange={(value) => updateTheme('colors.info', value)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Font Families</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FontSelector
                    label="Primary Font"
                    value={theme.typography.fontFamily.primary}
                    onChange={(value) => updateTheme('typography.fontFamily.primary', value)}
                    options={fontOptions}
                  />
                  <FontSelector
                    label="Secondary Font"
                    value={theme.typography.fontFamily.secondary}
                    onChange={(value) => updateTheme('typography.fontFamily.secondary', value)}
                    options={fontOptions}
                  />
                  <FontSelector
                    label="Monospace Font"
                    value={theme.typography.fontFamily.mono}
                    onChange={(value) => updateTheme('typography.fontFamily.mono', value)}
                    options={[
                      { label: 'Fira Code', value: 'Fira Code, monospace' },
                      { label: 'Source Code Pro', value: 'Source Code Pro, monospace' },
                      { label: 'JetBrains Mono', value: 'JetBrains Mono, monospace' },
                      { label: 'Consolas', value: 'Consolas, monospace' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Font Sizes</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.typography.fontSize).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium capitalize">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) => updateTheme(`typography.fontSize.${key}`, e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Font Weights</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.typography.fontWeight).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium capitalize">{key}</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[value]}
                          onValueChange={([newValue]) => updateTheme(`typography.fontWeight.${key}`, newValue)}
                          min={100}
                          max={900}
                          step={100}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-center">{value}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="navbar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Navbar Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <Input
                      value={theme.components.navbar.height}
                      onChange={(e) => updateTheme('components.navbar.height', e.target.value)}
                    />
                  </div>
                  <ColorPicker
                    label="Background Color"
                    value={theme.components.navbar.backgroundColor}
                    onChange={(value) => updateTheme('components.navbar.backgroundColor', value)}
                  />
                  <ColorPicker
                    label="Text Color"
                    value={theme.components.navbar.textColor}
                    onChange={(value) => updateTheme('components.navbar.textColor', value)}
                  />
                  <ColorPicker
                    label="Border Color"
                    value={theme.components.navbar.borderColor}
                    onChange={(value) => updateTheme('components.navbar.borderColor', value)}
                  />
                  <div className="space-y-2">
                    <Label>Logo Height</Label>
                    <Input
                      value={theme.components.navbar.logoHeight}
                      onChange={(e) => updateTheme('components.navbar.logoHeight', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={theme.components.navbar.sticky}
                      onCheckedChange={(checked) => updateTheme('components.navbar.sticky', checked)}
                    />
                    <Label>Sticky Navigation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={theme.components.navbar.blur}
                      onCheckedChange={(checked) => updateTheme('components.navbar.blur', checked)}
                    />
                    <Label>Background Blur</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buttons" className="space-y-6">
              {['primary', 'secondary', 'outline'].map((buttonType) => (
                <Card key={buttonType}>
                  <CardHeader>
                    <CardTitle className="capitalize">{buttonType} Button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <ColorPicker
                        label="Background"
                        value={theme.components.button[buttonType as keyof typeof theme.components.button].backgroundColor}
                        onChange={(value) => updateTheme(`components.button.${buttonType}.backgroundColor`, value)}
                      />
                      <ColorPicker
                        label="Text Color"
                        value={theme.components.button[buttonType as keyof typeof theme.components.button].textColor}
                        onChange={(value) => updateTheme(`components.button.${buttonType}.textColor`, value)}
                      />
                      <ColorPicker
                        label="Hover Background"
                        value={theme.components.button[buttonType as keyof typeof theme.components.button].hoverBackgroundColor}
                        onChange={(value) => updateTheme(`components.button.${buttonType}.hoverBackgroundColor`, value)}
                      />
                      <ColorPicker
                        label="Hover Text"
                        value={theme.components.button[buttonType as keyof typeof theme.components.button].hoverTextColor}
                        onChange={(value) => updateTheme(`components.button.${buttonType}.hoverTextColor`, value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Border Radius</Label>
                        <Input
                          value={theme.components.button[buttonType as keyof typeof theme.components.button].borderRadius}
                          onChange={(e) => updateTheme(`components.button.${buttonType}.borderRadius`, e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Padding</Label>
                        <Input
                          value={theme.components.button[buttonType as keyof typeof theme.components.button].padding}
                          onChange={(e) => updateTheme(`components.button.${buttonType}.padding`, e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Weight</Label>
                      <Slider
                        value={[theme.components.button[buttonType as keyof typeof theme.components.button].fontWeight]}
                        onValueChange={([value]) => updateTheme(`components.button.${buttonType}.fontWeight`, value)}
                        min={100}
                        max={900}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label className="text-sm text-gray-600 mb-2 block">Preview</Label>
                      <Button
                        variant={buttonType === 'primary' ? 'default' : buttonType === 'secondary' ? 'secondary' : 'outline'}
                        style={{
                          backgroundColor: theme.components.button[buttonType as keyof typeof theme.components.button].backgroundColor,
                          color: theme.components.button[buttonType as keyof typeof theme.components.button].textColor,
                          borderRadius: theme.components.button[buttonType as keyof typeof theme.components.button].borderRadius,
                          padding: theme.components.button[buttonType as keyof typeof theme.components.button].padding,
                          fontWeight: theme.components.button[buttonType as keyof typeof theme.components.button].fontWeight,
                        }}
                      >
                        {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)} Button
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <ColorPicker
                      label="Background"
                      value={theme.components.form.input.backgroundColor}
                      onChange={(value) => updateTheme('components.form.input.backgroundColor', value)}
                    />
                    <ColorPicker
                      label="Border Color"
                      value={theme.components.form.input.borderColor}
                      onChange={(value) => updateTheme('components.form.input.borderColor', value)}
                    />
                    <ColorPicker
                      label="Text Color"
                      value={theme.components.form.input.textColor}
                      onChange={(value) => updateTheme('components.form.input.textColor', value)}
                    />
                    <ColorPicker
                      label="Focus Border"
                      value={theme.components.form.input.focusBorderColor}
                      onChange={(value) => updateTheme('components.form.input.focusBorderColor', value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Border Radius</Label>
                      <Input
                        value={theme.components.form.input.borderRadius}
                        onChange={(e) => updateTheme('components.form.input.borderRadius', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Padding</Label>
                      <Input
                        value={theme.components.form.input.padding}
                        onChange={(e) => updateTheme('components.form.input.padding', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm text-gray-600 mb-2 block">Preview</Label>
                    <Input
                      placeholder="Sample input field"
                      style={{
                        backgroundColor: theme.components.form.input.backgroundColor,
                        borderColor: theme.components.form.input.borderColor,
                        borderRadius: theme.components.form.input.borderRadius,
                        padding: theme.components.form.input.padding,
                        color: theme.components.form.input.textColor,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Labels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <ColorPicker
                      label="Text Color"
                      value={theme.components.form.label.textColor}
                      onChange={(value) => updateTheme('components.form.label.textColor', value)}
                    />
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Input
                        value={theme.components.form.label.fontSize}
                        onChange={(e) => updateTheme('components.form.label.fontSize', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Font Weight</Label>
                    <Slider
                      value={[theme.components.form.label.fontWeight]}
                      onValueChange={([value]) => updateTheme('components.form.label.fontWeight', value)}
                      min={100}
                      max={900}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spacing System</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.spacing).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium uppercase">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) => updateTheme(`spacing.${key}`, e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Border Radius</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.borderRadius).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium capitalize">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) => updateTheme(`borderRadius.${key}`, e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Breakpoints</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.breakpoints).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium uppercase">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) => updateTheme(`breakpoints.${key}`, e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}