export type PricingType = "free" | "freemium" | "paid" | "enterprise";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  tool_count?: number;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description?: string;
  logo_url: string;
  website_url: string;
  affiliate_url?: string;
  pricing: PricingType;
  price_label?: string;
  category_id: string;
  category?: Category;
  tags: string[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_trending: boolean;
  is_sponsored: boolean;
  is_free: boolean;
  features?: string[];
  pros?: string[];
  cons?: string[];
  use_cases?: string[];
  screenshots?: string[];
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  author_name: string;
  author_avatar?: string;
  author_bio?: string;
  published_at: string;
  reading_time: number;
  tags: string[];
  seo_title?: string;
  seo_description?: string;
}

export interface Review {
  id: string;
  tool_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: "user" | "admin";
}

export interface ToolFilters {
  search?: string;
  category?: string;
  pricing?: PricingType[];
  freeOnly?: boolean;
  sort?: "popular" | "rating" | "newest" | "name";
  tags?: string[];
}
