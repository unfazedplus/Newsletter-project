export interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface Newsletter {
  id: number;
  title: string;
  author: string;
  role?: string;
  date: string;
  category: string;
  excerpt: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  image: string;
  images?: string[];
  commentsList?: Comment[];
}

export interface StatItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string;
  change: string;
}

export interface NewPostData {
  title: string;
  category: string;
  excerpt: string;
  tags: string;
  images: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  profilePicture: string;
  department: string;
  joinedDate: string;
}

export interface AccountSettings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    newsletter: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showActivity: boolean;
  };
}

export type ViewType = 'landing' | 'login' | 'signup' | 'home' | 'article' | 'create' | 'profile' | 'edit-profile' | 'settings' | 'feedback' | 'task-manager' | 'survey';

