import { useState, useEffect, useCallback } from 'react';
import { ViewRouter } from './ViewRouter';
import '../styles/survey.css';

import type { Newsletter, StatItem, NewPostData, ViewType, UserProfile, AccountSettings } from '../types/newsletter';
import { Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { sanitizeInput, sanitizeHtml } from '../utils/sanitize';
import { sanitizeQuery } from '../utils/validation';

// Initial data
const initialNewsletters: Newsletter[] = [
  {
    id: 1,
    title: "Q1 Product Roadmap: What's Coming Next",
    author: "Sarah Chen",
    role: "Product Manager",
    date: "2 hours ago",
    category: "Product Updates",
    excerpt: "Exciting new features planned for our marketplace platform, including AI-powered recommendations and enhanced vendor tools...",
    likes: 24,
    comments: 8,
    views: 156,
    tags: ["roadmap", "AI", "features"],
    image: "/api/placeholder/400/200",
    commentsList: [
      { id: 1, author: "John Doe", text: "Great roadmap! Looking forward to the AI features.", date: "1 hour ago" },
      { id: 2, author: "Jane Smith", text: "When will the vendor tools be available?", date: "30 minutes ago" }
    ]
  },
  {
    id: 2,
    title: "Team Spotlight: Engineering Excellence Awards",
    author: "Mike Johnson",
    role: "Engineering Lead",
    date: "5 hours ago",
    category: "Team News",
    excerpt: "Celebrating our incredible engineers who shipped the new search algorithm and improved platform performance by 40%...",
    likes: 31,
    comments: 12,
    views: 203,
    tags: ["awards", "engineering", "performance"],
    image: "/api/placeholder/400/200",
    commentsList: [
      { id: 1, author: "Alex Chen", text: "Congrats to the team!", date: "4 hours ago" },
      { id: 2, author: "Maria Garcia", text: "The new search is amazing!", date: "2 hours ago" }
    ]
  },
  {
    id: 3,
    title: "Customer Success Stories: Impact Beyond Numbers",
    author: "Emma Rodriguez",
    role: "Customer Success",
    date: "1 day ago",
    category: "Customer Stories",
    excerpt: "How Good helped small businesses increase their revenue by 300% - real stories from our verified vendors...",
    likes: 18,
    comments: 6,
    views: 89,
    tags: ["customers", "success", "impact"],
    image: "/api/placeholder/400/200",
    commentsList: [
      { id: 1, author: "Sam Wilson", text: "These stories are inspiring!", date: "20 hours ago" }
    ]
  }
];

export default function NewsletterPlatform() {
  const [currentView, setCurrentView] = useState<ViewType>(
    localStorage.getItem('currentView') as ViewType || 'landing'
  );
  

  
  const [likedPosts, setLikedPosts] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem('likedPosts');
      return new Set(stored ? JSON.parse(sanitizeQuery(stored)) : []);
    } catch {
      return new Set();
    }
  });
  
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem('bookmarkedPosts');
      return new Set(stored ? JSON.parse(sanitizeQuery(stored)) : []);
    } catch {
      return new Set();
    }
  });
  
  const [loginData, setLoginData] = useState<{ email: string; password: string }>(
    JSON.parse(localStorage.getItem('loginData') || '{"email":"","password":""}')
  );
  
  const [signupData, setSignupData] = useState<{ name: string; email: string; password: string; confirmPassword: string; department: string }>(
    JSON.parse(localStorage.getItem('signupData') || '{"name":"","email":"","password":"","confirmPassword":"","department":""}')
  );
  
  const [newComment, setNewComment] = useState<string>('');
  
  const [selectedArticleId, setSelectedArticleId] = useState<number>(
    parseInt(localStorage.getItem('selectedArticleId') || '1')
  );
  
  const [newsletters, setNewsletters] = useState<Newsletter[]>(
    JSON.parse(localStorage.getItem('newsletters') || JSON.stringify(initialNewsletters))
  );
  
  const [newPost, setNewPost] = useState<NewPostData>({
    title: '',
    category: 'Product Updates' ,
    excerpt: '',
    tags: '',
    images: []
  });

  // New state for user profile and account settings
  const [userProfile, setUserProfile] = useState<UserProfile>(
    JSON.parse(localStorage.getItem('userProfile') || JSON.stringify({
      name: '',
      email: '',
      location: '',
      profilePicture: '',
      department: 'Product Team',
      joinedDate: 'January 2024'
    }))
  );

  const [accountSettings, setAccountSettings] = useState<AccountSettings>(
    JSON.parse(localStorage.getItem('accountSettings') || JSON.stringify({
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        newsletter: true
      },
      privacy: {
        profileVisible: true,
        showActivity: true
      }
    }))
  );

  const [searchQuery, setSearchQuery] = useState<string>(  
    localStorage.getItem('searchQuery')||'');

    const handleViewChange = (view: string) => {
  setCurrentView(view as ViewType);
};


  // Update the existing useEffect to include new state
  useEffect(() => {
    localStorage.setItem('currentView', currentView);
    localStorage.setItem('likedPosts', JSON.stringify([...likedPosts]));
    localStorage.setItem('bookmarkedPosts', JSON.stringify([...bookmarkedPosts]));
    localStorage.setItem('loginData', JSON.stringify(loginData));
    localStorage.setItem('signupData', JSON.stringify(signupData));
    localStorage.setItem('selectedArticleId', selectedArticleId.toString());
    localStorage.setItem('newsletters', JSON.stringify(newsletters));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('accountSettings', JSON.stringify(accountSettings));
    localStorage.setItem('searchQuery', searchQuery);
  }, [currentView, likedPosts, bookmarkedPosts, loginData, signupData, selectedArticleId, newsletters, userProfile, accountSettings, searchQuery]);

  const toggleLike = useCallback((postId: number) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  }, []);

  const toggleBookmark = useCallback((postId: number) => {
    setBookmarkedPosts(prev => {
      const newBookmarked = new Set(prev);
      if (newBookmarked.has(postId)) {
        newBookmarked.delete(postId);
      } else {
        newBookmarked.add(postId);
      }
      return newBookmarked;
    });
  }, []);

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('home');
  }, []);

  const handleSignup = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setCurrentView('home');
  }, [signupData.password, signupData.confirmPassword]);

  const handleCreatePost = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.excerpt.trim()) {
      alert('Title and excerpt are required.');
      return;
    }
    
    try {
      const newNewsletter: Newsletter = {
        id: Date.now(),
        title: sanitizeHtml(newPost.title.trim()),
        author: "You",
        role: "Staff Member",
        date: "Just now",
        category: newPost.category,
        excerpt: sanitizeHtml(newPost.excerpt.trim()),
        likes: 0,
        comments: 0,
        views: 0,
        tags: newPost.tags.split(',').map(tag => sanitizeInput(tag.trim())).filter(Boolean),
        image: newPost.images.length > 0 ? newPost.images[0] : "/api/placeholder/400/200",
        images: newPost.images,
        commentsList: []
      };
      
      setNewsletters(prev => [newNewsletter, ...prev]);
      setNewPost({
        title: '',
        category: 'Product Updates',
        excerpt: '',
        tags: '',
        images: []
      });
      setCurrentView('home');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  }, [newPost]);

  const handleAddComment = useCallback((postId: number) => {
    if (!newComment.trim()) return;

    setNewsletters(prev => prev.map(newsletter => {
      if (newsletter.id === postId) {
        const comments = newsletter.commentsList || [];
        const newCommentObj = {
          id: comments.length + 1,
          author: "You",
          text: sanitizeHtml(newComment),
          date: "Just now"
        };
        
        return {
          ...newsletter,
          comments: newsletter.comments + 1,
          commentsList: [...comments, newCommentObj]
        };
      }
      return newsletter;
    }));
    
    setNewComment('');
  }, [newComment]);

  const handleDeleteComment = useCallback((postId: number, commentId: number) => {
    if (typeof postId !== 'number' || typeof commentId !== 'number') return;
    
    setNewsletters(prev => prev.map(newsletter => {
      if (newsletter.id === postId && newsletter.commentsList) {
        const filteredComments = newsletter.commentsList.filter(comment => comment.id !== commentId);
        return {
          ...newsletter,
          comments: Math.max(0, newsletter.comments - 1),
          commentsList: filteredComments
        };
      }
      return newsletter;
    }));
  }, []);

  const viewArticle = useCallback((articleId: number) => {
    if (typeof articleId === 'number' && articleId > 0) {
      setSelectedArticleId(articleId);
      setCurrentView('article');
    }
  }, []);

  const handleShare = useCallback((newsletter: Newsletter) => {
    const shareData = {
      title: sanitizeHtml(newsletter.title),
      text: sanitizeHtml(newsletter.excerpt),
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${sanitizeHtml(newsletter.title)}\n${sanitizeHtml(newsletter.excerpt)}\n${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  }, []);

  const stats: StatItem[] = [
    { icon: Users, label: "Active Staff", value: "247", change: "+12%" },
    { icon: Eye, label: "Newsletter Views", value: "1.2K", change: "+8%" },
    { icon: MessageCircle, label: "Discussions", value: "89", change: "+23%" },
    { icon: TrendingUp, label: "Engagement", value: "94%", change: "+5%" }
  ];



  return (
    <ViewRouter
      currentView={currentView}
      newsletters={newsletters}
      selectedArticleId={selectedArticleId}
      userProfile={userProfile}
      accountSettings={accountSettings}
      newPost={newPost}
      loginData={loginData}
      signupData={signupData}
      newComment={newComment}
      searchQuery={searchQuery}
      likedPosts={likedPosts}
      bookmarkedPosts={bookmarkedPosts}
      stats={stats}
      onViewChange={handleViewChange}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onCreatePost={handleCreatePost}
      onAddComment={handleAddComment}
      onDeleteComment={handleDeleteComment}
      onToggleLike={toggleLike}
      onToggleBookmark={toggleBookmark}
      onViewArticle={viewArticle}
      onShare={handleShare}
      setLoginData={setLoginData}
      setSignupData={setSignupData}
      setNewPost={setNewPost}
      setNewComment={setNewComment}
      setSearchQuery={setSearchQuery}
      setUserProfile={setUserProfile}
      setAccountSettings={setAccountSettings}
    />
  );
}
