export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  status: 'draft' | 'published';
  excerpt?: string;
  tags: string[];
  category: string;
  views: number;
  likes: number;
  comments: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  image: string;
  excerpt?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
}
