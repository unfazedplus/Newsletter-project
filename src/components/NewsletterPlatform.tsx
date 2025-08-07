import { useState, useEffect } from 'react';
import { LandingView } from './newsletter/LandingView';
import { LoginView } from './newsletter/LoginView';
import { SignupView } from './newsletter/SignupView';
import { CreatePostView } from './newsletter/CreatePostView';
import { ArticleView } from './newsletter/ArticleView';
import { HomeView } from './newsletter/HomeView';
import { ProfileView } from './newsletter/ProfileView';
import { EditProfileView } from './newsletter/EditProfileView';
import { AccountSettingsView } from './newsletter/AccountSettingsView';
import { FeedbackView } from './newsletter/FeedbackView';
import { TaskManagerView } from './newsletter/TaskManagerView';
import { SurveyView } from './newsletter/SurveyView';
import '../styles/survey.css';

import type { Newsletter, StatItem, NewPostData, ViewType, UserProfile, AccountSettings } from '../types/newsletter';
import { Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';

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
  

  
  const [likedPosts, setLikedPosts] = useState<Set<number>>(
    new Set(JSON.parse(localStorage.getItem('likedPosts') || '[]'))
  );
  
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(
    new Set(JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]'))
  );
  
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

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId: number) => {
    const newBookmarked = new Set(bookmarkedPosts);
    if (newBookmarked.has(postId)) {
      newBookmarked.delete(postId);
    } else {
      newBookmarked.add(postId);
    }
    setBookmarkedPosts(newBookmarked);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('home');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setCurrentView('home');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newNewsletter: Newsletter = {
        id: newsletters.length + 1,
        title: newPost.title,
        author: "You",
        role: "Staff Member",
        date: "Just now",
        category: newPost.category,
        excerpt: newPost.excerpt,
        likes: 0,
        comments: 0,
        views: 0,
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        image: newPost.images.length > 0 ? newPost.images[0] : "/api/placeholder/400/200",
        images: newPost.images,
        commentsList: []
      };
      
      setNewsletters([newNewsletter, ...newsletters]);
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
      alert('Failed to create post. Images may be too large.');
    }
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    const updatedNewsletters = newsletters.map(newsletter => {
      if (newsletter.id === postId) {
        const comments = newsletter.commentsList || [];
        const newCommentObj = {
          id: comments.length + 1,
          author: "You",
          text: newComment,
          date: "Just now"
        };
        
        return {
          ...newsletter,
          comments: newsletter.comments + 1,
          commentsList: [...comments, newCommentObj]
        };
      }
      return newsletter;
    });
    
    setNewsletters(updatedNewsletters);
    setNewComment('');
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    const updatedNewsletters = newsletters.map(newsletter => {
      if (newsletter.id === postId && newsletter.commentsList) {
        const filteredComments = newsletter.commentsList.filter(comment => comment.id !== commentId);
        return {
          ...newsletter,
          comments: newsletter.comments - 1,
          commentsList: filteredComments
        };
      }
      return newsletter;
    });
    
    setNewsletters(updatedNewsletters);
  };

  const viewArticle = (articleId: number) => {
    setSelectedArticleId(articleId);
    setCurrentView('article');
  };

  const handleShare = (newsletter: Newsletter) => {
    const shareData = {
      title: newsletter.title,
      text: newsletter.excerpt,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${newsletter.title}\n${newsletter.excerpt}\n${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const stats: StatItem[] = [
    { icon: Users, label: "Active Staff", value: "247", change: "+12%" },
    { icon: Eye, label: "Newsletter Views", value: "1.2K", change: "+8%" },
    { icon: MessageCircle, label: "Discussions", value: "89", change: "+23%" },
    { icon: TrendingUp, label: "Engagement", value: "94%", change: "+5%" }
  ];



  const commonProps = {
    newsletters,
    likedPosts,
    bookmarkedPosts,
    toggleLike,
    toggleBookmark,
    viewArticle,
    setCurrentView: handleViewChange,
    stats,
    accountSettings,
    setAccountSettings,
    handleShare
  };

  if (currentView === 'landing') {
    return (
      <LandingView
        setCurrentView={handleViewChange}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <LoginView
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
        setCurrentView={handleViewChange}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupView
        signupData={signupData}
        setSignupData={setSignupData}
        handleSignup={handleSignup}
        setCurrentView={handleViewChange}
      />
    );
  }

  if (currentView === 'create') {
    return (
      <CreatePostView
        newPost={newPost}
        setNewPost={setNewPost}
        handleCreatePost={handleCreatePost}
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }

  if (currentView === 'profile') {
    return (
      <ProfileView
        setCurrentView={handleViewChange}
        userProfile={userProfile}
        bookmarkedPosts={bookmarkedPosts}
        newsletters={newsletters}
        viewArticle={viewArticle}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }

  if (currentView === 'edit-profile') {
    return (
      <EditProfileView
        setCurrentView={handleViewChange}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }

  if (currentView === 'settings') {
    return (
      <AccountSettingsView
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }
  
  if (currentView === 'feedback') {
    return (
      <FeedbackView
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }

  if (currentView === 'article') {
    const article = newsletters.find(n => n.id === selectedArticleId) || newsletters[0];
    return (
      <ArticleView
        article={article}
        likedPosts={likedPosts}
        bookmarkedPosts={bookmarkedPosts}
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }
  
  if (currentView === 'task-manager') {
    return (
      <TaskManagerView
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }

  if (currentView === 'survey') {
    return (
      <SurveyView
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
      />
    );
  }

  return (
    <HomeView
      {...commonProps}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
