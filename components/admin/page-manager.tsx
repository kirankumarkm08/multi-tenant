'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Eye, Globe, Lock, Search, Copy } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  slug: string;
  status: 'published' | 'draft' | 'private';
  template?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PageManagerProps {
  pages: Page[];
  onPagesChange: (pages: Page[]) => void;
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
}

export function PageManager({ pages, onPagesChange, selectedPage, onPageSelect }: PageManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState({
    name: '',
    slug: '',
    status: 'draft' as const,
    template: 'blank',
    seoTitle: '',
    seoDescription: ''
  });

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'private':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Globe size={14} />;
      case 'draft':
        return <Edit size={14} />;
      case 'private':
        return <Lock size={14} />;
      default:
        return <Edit size={14} />;
    }
  };

  const handleCreatePage = () => {
    const page: Page = {
      id: Date.now().toString(),
      name: newPage.name,
      slug: newPage.slug.startsWith('/') ? newPage.slug : `/${newPage.slug}`,
      status: newPage.status,
      template: newPage.template,
      seoTitle: newPage.seoTitle,
      seoDescription: newPage.seoDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onPagesChange([...pages, page]);
    setIsCreateDialogOpen(false);
    setNewPage({
      name: '',
      slug: '',
      status: 'draft',
      template: 'blank',
      seoTitle: '',
      seoDescription: ''
    });
  };

  const handleUpdatePage = (updatedPage: Page) => {
    onPagesChange(pages.map(page => 
      page.id === updatedPage.id 
        ? { ...updatedPage, updatedAt: new Date().toISOString() }
        : page
    ));
    setEditingPage(null);
  };

  const handleDeletePage = (pageId: string) => {
    onPagesChange(pages.filter(page => page.id !== pageId));
    if (selectedPage === pageId) {
      onPageSelect(pages[0]?.id || '');
    }
  };

  const handleDuplicatePage = (page: Page) => {
    const duplicatedPage: Page = {
      ...page,
      id: Date.now().toString(),
      name: `${page.name} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onPagesChange([...pages, duplicatedPage]);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              Create New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="page-name">Page Name</Label>
                  <Input
                    id="page-name"
                    value={newPage.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setNewPage(prev => ({
                        ...prev,
                        name,
                        slug: generateSlug(name)
                      }));
                    }}
                    placeholder="About Us"
                  />
                </div>
                <div>
                  <Label htmlFor="page-slug">URL Slug</Label>
                  <Input
                    id="page-slug"
                    value={newPage.slug}
                    onChange={(e) => setNewPage(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="/about-us"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="page-status">Status</Label>
                  <Select value={newPage.status} onValueChange={(value: any) => setNewPage(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="page-template">Template</Label>
                  <Select value={newPage.template} onValueChange={(value) => setNewPage(prev => ({ ...prev, template: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Blank Page</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="content">Content Page</SelectItem>
                      <SelectItem value="contact">Contact Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  value={newPage.seoTitle}
                  onChange={(e) => setNewPage(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="Page title for search engines"
                />
              </div>

              <div>
                <Label htmlFor="seo-description">SEO Description</Label>
                <Textarea
                  id="seo-description"
                  value={newPage.seoDescription}
                  onChange={(e) => setNewPage(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Brief description for search engines"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePage} disabled={!newPage.name || !newPage.slug}>
                  Create Page
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <Card 
            key={page.id} 
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              selectedPage === page.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onPageSelect(page.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg truncate">{page.name}</CardTitle>
                <Badge className={getStatusColor(page.status)}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(page.status)}
                    <span className="capitalize">{page.status}</span>
                  </span>
                </Badge>
              </div>
              <p className="text-sm text-gray-600 truncate">{page.slug}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {page.seoTitle && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">SEO Title</p>
                    <p className="text-sm truncate">{page.seoTitle}</p>
                  </div>
                )}
                
                {page.template && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Template</p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {page.template}
                    </Badge>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {page.updatedAt && `Updated ${new Date(page.updatedAt).toLocaleDateString()}`}
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" title="Preview">
                      <Eye size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      title="Duplicate"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicatePage(page);
                      }}
                    >
                      <Copy size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPage(page);
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this page?')) {
                          handleDeletePage(page.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Page Dialog */}
      <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-page-name">Page Name</Label>
                  <Input
                    id="edit-page-name"
                    value={editingPage.name}
                    onChange={(e) => setEditingPage(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-page-slug">URL Slug</Label>
                  <Input
                    id="edit-page-slug"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage(prev => prev ? { ...prev, slug: e.target.value } : null)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-page-status">Status</Label>
                  <Select 
                    value={editingPage.status} 
                    onValueChange={(value: any) => setEditingPage(prev => prev ? { ...prev, status: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-page-template">Template</Label>
                  <Select 
                    value={editingPage.template || 'blank'} 
                    onValueChange={(value) => setEditingPage(prev => prev ? { ...prev, template: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Blank Page</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="content">Content Page</SelectItem>
                      <SelectItem value="contact">Contact Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-seo-title">SEO Title</Label>
                <Input
                  id="edit-seo-title"
                  value={editingPage.seoTitle || ''}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, seoTitle: e.target.value } : null)}
                />
              </div>

              <div>
                <Label htmlFor="edit-seo-description">SEO Description</Label>
                <Textarea
                  id="edit-seo-description"
                  value={editingPage.seoDescription || ''}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, seoDescription: e.target.value } : null)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingPage(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdatePage(editingPage)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}