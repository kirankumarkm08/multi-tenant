# Multi-Tenant Event Management SaaS Platform

A comprehensive Next.js application for managing multi-tenant event management with Laravel backend integration.

## 🏗️ Architecture Overview

### Frontend Layer (Next.js)
- **Public Site**: Event pages, ticket sales, speaker profiles
- **Admin Dashboard**: Event management, analytics, CMS
- **Drag & Drop CMS**: Visual page builder with component system

### API Integration (Laravel Backend)
- **Multi-tenant Architecture**: Domain-based tenant routing
- **Authentication**: JWT-based auth with role management
- **RESTful APIs**: Comprehensive API coverage for all features

### Key Features
- 🎯 **Multi-tenant Support**: Each client gets their own branded experience
- 🎨 **Visual Page Builder**: Drag-and-drop interface for content creation
- 🎫 **Ticketing System**: Complete ticket management with QR codes
- 💳 **Payment Integration**: SquareUP and Web3 payment support
- 📊 **Analytics Dashboard**: Comprehensive reporting and insights
- 👥 **User Management**: Role-based access control
- 📱 **Responsive Design**: Mobile-first approach

## 🚀 API Endpoints Required

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Tenants
```
GET  /api/tenants/by-domain?domain={domain}
PUT  /api/tenants/{id}
GET  /api/tenants/{id}/settings
PUT  /api/tenants/{id}/settings
GET  /api/tenants/{id}/stats
```

### Events
```
GET    /api/events
POST   /api/events
GET    /api/events/{id}
PUT    /api/events/{id}
DELETE /api/events/{id}
POST   /api/events/{id}/duplicate
PATCH  /api/events/{id}/publish
GET    /api/events/{id}/analytics
```

### Tickets
```
GET    /api/events/{eventId}/tickets
POST   /api/tickets
GET    /api/events/{eventId}/tickets/{ticketId}
PUT    /api/tickets/{id}
DELETE /api/tickets/{id}
POST   /api/tickets/{id}/duplicate
PATCH  /api/tickets/{id}/status
GET    /api/tickets/{id}/sales
```

### Speakers
```
GET    /api/events/{eventId}/speakers
POST   /api/speakers
GET    /api/events/{eventId}/speakers/{speakerId}
PUT    /api/speakers/{id}
DELETE /api/speakers/{id}
PATCH  /api/speakers/{id}/featured
POST   /api/speakers/bulk-import
```

### Pages & CMS
```
GET    /api/pages
POST   /api/pages
GET    /api/pages/{id}
PUT    /api/pages/{id}
PUT    /api/pages/{id}/components
DELETE /api/pages/{id}
GET    /api/pages/by-slug?slug={slug}
POST   /api/pages/{id}/duplicate
PATCH  /api/pages/{id}/publish
GET    /api/pages/{id}/preview
GET    /api/pages/templates
POST   /api/pages/from-template
```

### Attendees
```
GET    /api/events/{eventId}/attendees
GET    /api/events/{eventId}/attendees/{attendeeId}
PATCH  /api/attendees/{id}/check-in
POST   /api/attendees/bulk-check-in
POST   /api/attendees/send-email
GET    /api/events/{eventId}/attendees/export
GET    /api/attendees/{id}/qr-code
POST   /api/attendees/validate-qr
GET    /api/events/{eventId}/attendees/stats
```

### Orders
```
GET    /api/orders
GET    /api/orders/{id}
PATCH  /api/orders/{id}/status
POST   /api/orders/{id}/refund
POST   /api/orders/{id}/resend-confirmation
GET    /api/orders/export
GET    /api/orders/stats
POST   /api/orders/{id}/process-payment
```

### Blog
```
GET    /api/blog/posts
POST   /api/blog/posts
GET    /api/blog/posts/{id}
PUT    /api/blog/posts/{id}
DELETE /api/blog/posts/{id}
GET    /api/blog/posts/by-slug?slug={slug}
PATCH  /api/blog/posts/{id}/publish
GET    /api/blog/tags
GET    /api/blog/posts/{id}/stats
```

### Analytics
```
GET /api/analytics
GET /api/analytics/revenue
GET /api/analytics/tickets
GET /api/analytics/attendees
GET /api/analytics/conversion
GET /api/analytics/export
```

## 🔧 API Client Features

### Authentication Handling
- Automatic token management
- Token refresh on expiry
- Secure storage in localStorage

### Multi-tenant Support
- Domain-based tenant identification
- Automatic tenant header injection
- Tenant-scoped API calls

### Error Handling
- Comprehensive error types
- Automatic retry logic
- User-friendly error messages

### File Upload Support
- Multipart form data handling
- Progress tracking
- Image optimization

## 📝 Usage Examples

### Creating an Event
```typescript
import { eventsService } from '@/lib/api/services/events';

const createEvent = async () => {
  try {
    const response = await eventsService.createEvent({
      name: 'Tech Conference 2025',
      description: 'Annual technology conference',
      start_date: '2025-06-15',
      end_date: '2025-06-17',
      venue: 'Convention Center',
      capacity: 1000,
      image: imageFile
    });
    console.log('Event created:', response.data);
  } catch (error) {
    console.error('Failed to create event:', error);
  }
};
```

### Using the API Hook
```typescript
import { useApi } from '@/lib/hooks/use-api';
import { eventsService } from '@/lib/api/services/events';

const EventsList = () => {
  const { data: events, loading, error, refetch } = useApi(
    () => eventsService.getEvents({ status: 'published' })
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {events?.map(event => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
};
```

### Page Builder Integration
```typescript
import { pagesService } from '@/lib/api/services/pages';

const savePage = async (pageId: string, components: PageComponent[]) => {
  try {
    await pagesService.updatePageComponents(pageId, { components });
    console.log('Page saved successfully');
  } catch (error) {
    console.error('Failed to save page:', error);
  }
};
```

## 🔐 Security Features

- JWT token authentication
- Role-based access control
- CSRF protection
- Input validation
- File upload security
- Rate limiting support

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interfaces
- Progressive web app features

## 🎨 Design System

- Consistent color palette
- Typography scale
- Component library
- Animation system
- Accessibility compliance

This API integration layer provides a complete foundation for connecting your Next.js frontend with the Laravel backend, supporting all the multi-tenant event management features outlined in your architecture.#   s a a s - m u l t i - t e n a n t s  
 #   m u l t i - t e n a n t  
 #   m u l t i - t e n a n t  
 