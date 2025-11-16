// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  demoUrl: string;
  features: string[];
  tags: string[];
  author: string;
  downloads: number;
  lastUpdated: string;
}

export type TemplateCategory =
  | 'ecommerce'
  | 'portfolio'
  | 'saas'
  | 'blog'
  | 'landing'
  | 'corporate'
  | 'admin'
  | 'creative';

// Expert types
export interface Expert {
  id: string;
  name: string;
  title: string;
  expertise: ExpertiseType[];
  rating: number;
  reviewCount: number;
  completedProjects: number;
  hourlyRate: number;
  avatar: string;
  bio: string;
  skills: string[];
  languages: string[];
  responseTime: string;
  portfolio: Portfolio[];
  verified: boolean;
}

export type ExpertiseType = 'frontend' | 'backend' | 'fullstack' | 'design' | 'mobile';

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

// Review types
export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

// Community types
export interface CommunityPost {
  id: string;
  type: 'question' | 'article' | 'showcase';
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorLevel: number;
  date: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  solved?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'buyer' | 'seller' | 'expert' | 'admin';
  level: number;
  points: number;
  badges: Badge[];
  purchasedTemplates: string[];
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// Cart and Order types
export interface CartItem {
  templateId: string;
  template: Template;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

// Project Request types
export interface ProjectRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  deadline: string;
  category: TemplateCategory;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  proposals: Proposal[];
  createdAt: string;
}

export interface Proposal {
  id: string;
  expertId: string;
  expert: Expert;
  projectRequestId: string;
  message: string;
  budget: number;
  deliveryTime: string;
  createdAt: string;
}

// Dashboard types
export interface SalesStats {
  period: 'today' | 'week' | 'month' | 'year';
  revenue: number;
  sales: number;
  growth: number;
}
