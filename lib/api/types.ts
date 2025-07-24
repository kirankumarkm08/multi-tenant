// Core API Types
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  plan: 'free' | 'pro' | 'custom';
  settings: {
    modules_enabled: string[];
    payment_methods: string[];
    features: Record<string, boolean>;
  };
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'customer';
  tenant_id?: string;
  avatar?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  token?: string;
}

export interface EventEdition {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: string;
  capacity: number;
  status: 'draft' | 'published' | 'live' | 'ended';
  tickets_sold: number;
  revenue: number;
  image?: string;
  settings: {
    registration_enabled: boolean;
    check_in_enabled: boolean;
    nft_enabled: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface TicketType {
  id: string;
  event_edition_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  type: 'general' | 'vip' | 'early-bird' | 'student';
  status: 'active' | 'sold-out' | 'inactive';
  features: string[];
  sale_start_date?: string;
  sale_end_date?: string;
  settings: {
    nft_enabled: boolean;
    transferable: boolean;
    max_per_order: number;
  };
  created_at: string;
  updated_at: string;
}

export interface Speaker {
  id: string;
  event_edition_id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image?: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessions: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Attendee {
  id: string;
  event_edition_id: string;
  order_id: string;
  name: string;
  email: string;
  ticket_type_id: string;
  ticket_type_name: string;
  check_in_status: 'pending' | 'checked-in' | 'no-show';
  check_in_time?: string;
  qr_code: string;
  nft_token_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  event_edition_id: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  tickets: {
    ticket_type_id: string;
    ticket_type_name: string;
    quantity: number;
    price: number;
  }[];
  total_amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_method: 'credit-card' | 'web3' | 'bank-transfer';
  payment_details: {
    transaction_id?: string;
    wallet_address?: string;
    blockchain?: string;
  };
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface Page {
  id: string;
  tenant_id: string;
  event_edition_id?: string;
  name: string;
  slug: string;
  status: 'published' | 'draft' | 'private';
  template: string;
  components: PageComponent[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    og_image?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface PageComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  order: number;
  parent_id?: string;
}

export interface BlogPost {
  id: string;
  tenant_id: string;
  event_edition_id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string;
  author_name: string;
  status: 'draft' | 'published';
  tags: string[];
  image?: string;
  views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  revenue: {
    total: number;
    by_period: { period: string; amount: number }[];
    by_payment_method: { method: string; amount: number; percentage: number }[];
  };
  tickets: {
    total_sold: number;
    by_type: { type: string; sold: number; revenue: number }[];
    sales_over_time: { date: string; tickets: number; revenue: number }[];
  };
  attendees: {
    total: number;
    checked_in: number;
    by_geography: { country: string; count: number; percentage: number }[];
  };
  conversion: {
    rate: number;
    funnel: { step: string; count: number; rate: number }[];
  };
}

// API Request/Response Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CreateEventRequest {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: string;
  capacity: number;
  image?: File;
}

export interface CreateTicketRequest {
  event_edition_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: 'general' | 'vip' | 'early-bird' | 'student';
  features: string[];
  sale_start_date?: string;
  sale_end_date?: string;
  settings: {
    nft_enabled: boolean;
    transferable: boolean;
    max_per_order: number;
  };
}

export interface CreateSpeakerRequest {
  event_edition_id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image?: File;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessions: string[];
  featured: boolean;
}

export interface CreatePageRequest {
  name: string;
  slug: string;
  status: 'published' | 'draft' | 'private';
  template: string;
  event_edition_id?: string;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface UpdatePageComponentsRequest {
  components: PageComponent[];
}

export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  tags: string[];
  image?: File;
  event_edition_id?: string;
}