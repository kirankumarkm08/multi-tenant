// Mock data for the admin panel
export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  capacity: number;
  status: 'draft' | 'published' | 'live' | 'ended';
  ticketsSold: number;
  revenue: number;
  image: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  type: 'general' | 'vip' | 'early-bird' | 'student';
  status: 'active' | 'sold-out' | 'inactive';
  features: string[];
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessions: string[];
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  checkInStatus: 'pending' | 'checked-in' | 'no-show';
  registrationDate: string;
  qrCode: string;
  orderNumber: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  tickets: {
    ticketId: string;
    ticketName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'credit-card' | 'web3' | 'bank-transfer';
  orderDate: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published';
  tags: string[];
  image: string;
  views: number;
}

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'RareEvo Conference 2025',
    description: 'The premier technology conference bringing together industry leaders and innovators.',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    venue: 'San Francisco Convention Center',
    capacity: 2500,
    status: 'published',
    ticketsSold: 1847,
    revenue: 284573,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'RareEvo Workshop Series',
    description: 'Intensive hands-on workshops for developers and designers.',
    startDate: '2025-02-20',
    endDate: '2025-02-21',
    venue: 'Tech Hub Downtown',
    capacity: 150,
    status: 'live',
    ticketsSold: 142,
    revenue: 28400,
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Early Bird General Admission',
    description: 'Full access to all conference sessions and networking events',
    price: 299,
    quantity: 1000,
    sold: 856,
    type: 'early-bird',
    status: 'active',
    features: ['All Sessions', 'Networking Events', 'Conference Swag', 'Lunch Included']
  },
  {
    id: '2',
    eventId: '1',
    name: 'VIP Experience',
    description: 'Premium access with exclusive perks and priority seating',
    price: 599,
    quantity: 200,
    sold: 167,
    type: 'vip',
    status: 'active',
    features: ['All Sessions', 'VIP Lounge Access', 'Premium Swag', 'Meet & Greet', 'Priority Seating']
  },
  {
    id: '3',
    eventId: '1',
    name: 'Student Discount',
    description: 'Special pricing for students with valid ID',
    price: 149,
    quantity: 300,
    sold: 234,
    type: 'student',
    status: 'active',
    features: ['All Sessions', 'Student Networking', 'Digital Resources']
  },
  {
    id: '4',
    eventId: '1',
    name: 'General Admission',
    description: 'Standard conference access',
    price: 399,
    quantity: 1000,
    sold: 590,
    type: 'general',
    status: 'active',
    features: ['All Sessions', 'Networking Events', 'Conference Materials']
  }
];

// Mock Speakers
export const mockSpeakers: Speaker[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'VP of Engineering',
    company: 'TechCorp',
    bio: 'Sarah is a seasoned engineering leader with over 15 years of experience building scalable systems at Fortune 500 companies.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    social: {
      twitter: '@sarahchen',
      linkedin: 'sarah-chen-tech',
      website: 'sarahchen.dev'
    },
    sessions: ['Keynote: The Future of AI', 'Building Resilient Systems']
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Senior Product Designer',
    company: 'DesignLab',
    bio: 'Marcus specializes in user experience design and has worked with startups and enterprises to create intuitive digital products.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    social: {
      twitter: '@marcusux',
      linkedin: 'marcus-rodriguez-design'
    },
    sessions: ['Design Systems at Scale', 'UX Research Methods']
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    title: 'AI Research Scientist',
    company: 'AI Institute',
    bio: 'Dr. Watson leads cutting-edge research in machine learning and has published over 50 papers in top-tier conferences.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    social: {
      linkedin: 'emily-watson-ai',
      website: 'emilywatson.ai'
    },
    sessions: ['Machine Learning Ethics', 'Neural Network Architectures']
  },
  {
    id: '4',
    name: 'James Kim',
    title: 'Blockchain Developer',
    company: 'CryptoTech',
    bio: 'James is a blockchain expert who has built decentralized applications and smart contracts for various industries.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    social: {
      twitter: '@jamesblockchain',
      website: 'jameskim.crypto'
    },
    sessions: ['Web3 Development', 'Smart Contract Security']
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    bio: 'Lisa has extensive experience in cloud infrastructure and has helped companies migrate to modern DevOps practices.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    social: {
      twitter: '@lisadevops',
      linkedin: 'lisa-thompson-devops'
    },
    sessions: ['Kubernetes Best Practices', 'CI/CD Pipeline Optimization']
  },
  {
    id: '6',
    name: 'Alex Rivera',
    title: 'Startup Founder',
    company: 'InnovateLab',
    bio: 'Alex has founded three successful startups and now mentors other entrepreneurs in the tech ecosystem.',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    social: {
      twitter: '@alexstartup',
      linkedin: 'alex-rivera-founder',
      website: 'alexrivera.co'
    },
    sessions: ['Startup Funding Strategies', 'Building Tech Teams']
  }
];

// Mock Attendees
export const mockAttendees: Attendee[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    ticketType: 'Early Bird General Admission',
    checkInStatus: 'checked-in',
    registrationDate: '2025-01-10',
    qrCode: 'QR123456789',
    orderNumber: '#12847'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    ticketType: 'VIP Experience',
    checkInStatus: 'pending',
    registrationDate: '2025-01-12',
    qrCode: 'QR987654321',
    orderNumber: '#12848'
  },
  {
    id: '3',
    name: 'David Lee',
    email: 'david.lee@email.com',
    ticketType: 'Student Discount',
    checkInStatus: 'checked-in',
    registrationDate: '2025-01-08',
    qrCode: 'QR456789123',
    orderNumber: '#12849'
  },
  {
    id: '4',
    name: 'Sophie Wilson',
    email: 'sophie.wilson@email.com',
    ticketType: 'General Admission',
    checkInStatus: 'no-show',
    registrationDate: '2025-01-15',
    qrCode: 'QR789123456',
    orderNumber: '#12850'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#12847',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0123'
    },
    tickets: [
      {
        ticketId: '1',
        ticketName: 'Early Bird General Admission',
        quantity: 2,
        price: 299
      }
    ],
    totalAmount: 598,
    status: 'completed',
    paymentMethod: 'credit-card',
    orderDate: '2025-01-15',
    notes: 'Customer requested invoice'
  },
  {
    id: '2',
    orderNumber: '#12846',
    customer: {
      name: 'Michael Chen',
      email: 'michael@example.com'
    },
    tickets: [
      {
        ticketId: '2',
        ticketName: 'VIP Experience',
        quantity: 1,
        price: 599
      }
    ],
    totalAmount: 599,
    status: 'pending',
    paymentMethod: 'web3',
    orderDate: '2025-01-15'
  },
  {
    id: '3',
    orderNumber: '#12845',
    customer: {
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1-555-0456'
    },
    tickets: [
      {
        ticketId: '1',
        ticketName: 'Early Bird General Admission',
        quantity: 3,
        price: 299
      }
    ],
    totalAmount: 897,
    status: 'completed',
    paymentMethod: 'credit-card',
    orderDate: '2025-01-14'
  },
  {
    id: '4',
    orderNumber: '#12844',
    customer: {
      name: 'James Wilson',
      email: 'james@example.com'
    },
    tickets: [
      {
        ticketId: '3',
        ticketName: 'Student Discount',
        quantity: 1,
        price: 149
      }
    ],
    totalAmount: 149,
    status: 'failed',
    paymentMethod: 'credit-card',
    orderDate: '2025-01-14',
    notes: 'Payment declined - customer notified'
  },
  {
    id: '5',
    orderNumber: '#12843',
    customer: {
      name: 'Anna Rodriguez',
      email: 'anna@example.com'
    },
    tickets: [
      {
        ticketId: '2',
        ticketName: 'VIP Experience',
        quantity: 2,
        price: 599
      }
    ],
    totalAmount: 1198,
    status: 'completed',
    paymentMethod: 'bank-transfer',
    orderDate: '2025-01-13'
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Announcing RareEvo 2025: Our Biggest Event Yet',
    slug: 'announcing-rareevo-2025',
    excerpt: 'We\'re excited to announce RareEvo 2025, featuring world-class speakers and cutting-edge technology demonstrations.',
    content: 'Full blog content here...',
    author: 'Event Team',
    publishDate: '2025-01-10',
    status: 'published',
    tags: ['announcement', 'conference', '2025'],
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 1247
  },
  {
    id: '2',
    title: 'Meet Our Keynote Speakers',
    slug: 'meet-our-keynote-speakers',
    excerpt: 'Get to know the industry leaders who will be sharing their insights at RareEvo 2025.',
    content: 'Full blog content here...',
    author: 'Sarah Chen',
    publishDate: '2025-01-08',
    status: 'published',
    tags: ['speakers', 'keynote'],
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 892
  },
  {
    id: '3',
    title: 'Early Bird Tickets Now Available',
    slug: 'early-bird-tickets-available',
    excerpt: 'Secure your spot at RareEvo 2025 with special early bird pricing. Limited time offer!',
    content: 'Full blog content here...',
    author: 'Marketing Team',
    publishDate: '2025-01-05',
    status: 'published',
    tags: ['tickets', 'early-bird', 'pricing'],
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 2156
  }
];

// Analytics data
export const mockAnalytics = {
  ticketSalesOverTime: [
    { name: 'Jan', tickets: 65, revenue: 19435 },
    { name: 'Feb', tickets: 89, revenue: 26611 },
    { name: 'Mar', tickets: 145, revenue: 43355 },
    { name: 'Apr', tickets: 234, revenue: 69966 },
    { name: 'May', tickets: 378, revenue: 113022 },
    { name: 'Jun', tickets: 456, revenue: 136368 },
    { name: 'Jul', tickets: 523, revenue: 156377 },
    { name: 'Aug', tickets: 645, revenue: 192855 },
    { name: 'Sep', tickets: 789, revenue: 236211 },
    { name: 'Oct', tickets: 934, revenue: 279266 },
    { name: 'Nov', tickets: 1123, revenue: 335777 },
    { name: 'Dec', tickets: 1245, revenue: 372255 },
  ],
  ticketTypeDistribution: [
    { name: 'Early Bird', value: 856, color: '#3B82F6' },
    { name: 'VIP', value: 167, color: '#10B981' },
    { name: 'Student', value: 234, color: '#F59E0B' },
    { name: 'General', value: 590, color: '#EF4444' },
  ],
  revenueByPaymentMethod: [
    { name: 'Credit Card', value: 245000, percentage: 86 },
    { name: 'Web3', value: 28000, percentage: 10 },
    { name: 'Bank Transfer', value: 11573, percentage: 4 },
  ],
  attendeeGeography: [
    { country: 'United States', attendees: 1247, percentage: 67.5 },
    { country: 'Canada', attendees: 234, percentage: 12.7 },
    { country: 'United Kingdom', attendees: 156, percentage: 8.4 },
    { country: 'Germany', attendees: 89, percentage: 4.8 },
    { country: 'Australia', attendees: 67, percentage: 3.6 },
    { country: 'Others', attendees: 54, percentage: 2.9 },
  ]
};