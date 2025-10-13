// types/index.ts

// ============================================
// Food/Recipe Types
// ============================================

export interface FoodItem {
  _id?: string;
  type: string; // e.g., "Breakfast", "Lunch", "Dinner", "Dessert"
  time: string; // e.g., "30 mins", "1 hour"
  people: string; // e.g., "2 servings", "4 people"
  title: string;
  desc: string;
  imgSrc: string;
  author?: string; // User email or ID
  authorName?: string;
  status?: 'draft' | 'published' | 'pending';
  createdAt?: Date | string;
  updatedAt?: Date | string;
  
  // User interaction data
  likes?: number;
  comments?: Comment[];
  
  // Additional recipe details (optional)
  ingredients?: string[];
  instructions?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  cuisine?: string;
  tags?: string[];
  videoUrl?: string;
  
  // Nutritional info (optional)
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
}

export interface Comment {
  _id?: string;
  author?: string;
  authorName?: string;
  text: string;
  createdAt?: Date | string;
}

// ============================================
// User Types
// ============================================

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string; // Only for registration, never exposed in responses
  role: 'user' | 'admin';
  image?: string;
  bio?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  
  // User stats
  totalBlogs?: number;
  totalLikes?: number;
  followers?: number;
}

export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    image?: string;
  };
  expires: string;
}

// ============================================
// Blog/Recipe Post Types
// ============================================

export interface BlogPost {
  _id?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string; // User email or ID
  authorName: string;
  status: 'draft' | 'published' | 'pending';
  
  // Recipe specific fields
  type?: string; // Recipe category
  time?: string; // Cooking time
  servings?: string; // Number of people
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients?: string[];
  instructions?: string[];
  
  // Engagement
  likes?: number;
  views?: number;
  comments?: Comment[];
  
  // Metadata
  tags?: string[];
  cuisine?: string;
  videoUrl?: string;
  
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface CreateBlogInput {
  title: string;
  description: string;
  content: string;
  image?: string;
  type?: string;
  time?: string;
  servings?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients?: string[];
  instructions?: string[];
  tags?: string[];
  cuisine?: string;
  videoUrl?: string;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
  status?: 'draft' | 'published' | 'pending';
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Dashboard Stats Types
// ============================================

export interface UserDashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  pendingBlogs: number;
  totalLikes: number;
  totalViews: number;
  recentBlogs: BlogPost[];
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  pendingBlogs: number;
  newUsersThisMonth: number;
  newBlogsThisMonth: number;
  recentUsers: User[];
  recentBlogs: BlogPost[];
  topAuthors: {
    author: string;
    authorName: string;
    blogCount: number;
  }[];
}

// ============================================
// Form Types
// ============================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface BlogFormData {
  title: string;
  description: string;
  content: string;
  image: string;
  type: string;
  time: string;
  servings: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  tags: string[];
  cuisine: string;
  videoUrl?: string;
}

export interface UserSettingsFormData {
  name: string;
  email: string;
  bio?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

// ============================================
// Filter & Search Types
// ============================================

export interface BlogFilters {
  status?: 'draft' | 'published' | 'pending' | 'all';
  type?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  cuisine?: string;
  author?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'likes' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UserFilters {
  role?: 'user' | 'admin' | 'all';
  search?: string;
  sortBy?: 'createdAt' | 'name' | 'email';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// ============================================
// Component Props Types
// ============================================

export interface FoodItemCardProps {
  item: FoodItem;
  index: number;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

// ============================================
// Table Types
// ============================================

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// ============================================
// Upload Types
// ============================================

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface ImageUploadProps {
  onUpload: (file: UploadedFile) => void;
  currentImage?: string;
  label?: string;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

// ============================================
// Hook Return Types
// ============================================

export interface UseUserImpressionInteractionsReturn {
  likesCount: number;
  comments: Comment[];
  like: () => Promise<void>;
  postComment: (text: string) => Promise<void>;
  pending: boolean;
}

export interface UseBlogsReturn {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createBlog: (data: CreateBlogInput) => Promise<ApiResponse>;
  updateBlog: (id: string, data: UpdateBlogInput) => Promise<ApiResponse>;
  deleteBlog: (id: string) => Promise<ApiResponse>;
}

export interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  deleteUser: (id: string) => Promise<ApiResponse>;
}

// ============================================
// Utility Types
// ============================================

export type RecipeCategory = 
  | 'Breakfast' 
  | 'Lunch' 
  | 'Dinner' 
  | 'Dessert' 
  | 'Snack' 
  | 'Appetizer' 
  | 'Beverage';

export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

export type RecipeStatus = 'draft' | 'published' | 'pending';

export type UserRole = 'user' | 'admin';

export type SortOrder = 'asc' | 'desc';

// ============================================
// Enums (Alternative to string unions)
// ============================================

export enum RecipeCategoryEnum {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  DESSERT = 'Dessert',
  SNACK = 'Snack',
  APPETIZER = 'Appetizer',
  BEVERAGE = 'Beverage'
}

export enum RecipeDifficultyEnum {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum RecipeStatusEnum {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING = 'pending'
}

export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin'
}

// ============================================
// Constants
// ============================================

export const RECIPE_CATEGORIES: RecipeCategory[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack',
  'Appetizer',
  'Beverage'
];

export const RECIPE_DIFFICULTIES: RecipeDifficulty[] = [
  'easy',
  'medium',
  'hard'
];

export const CUISINES = [
  'American',
  'Chinese',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mexican',
  'Thai',
  'Mediterranean',
  'Middle Eastern',
  'Spanish',
  'Vietnamese',
  'Other'
] as const;

export type Cuisine = typeof CUISINES[number];

// ============================================
// Type Guards
// ============================================

export function isFoodItem(obj: any): obj is FoodItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.type === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.desc === 'string'
  );
}

export function isBlogPost(obj: any): obj is BlogPost {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.content === 'string'
  );
}

export function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    (obj.role === 'user' || obj.role === 'admin')
  );
}