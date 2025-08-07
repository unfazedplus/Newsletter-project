import React, { memo } from 'react';
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
import type { ViewType, Newsletter, UserProfile, AccountSettings, NewPostData, StatItem } from '../types/newsletter';

interface ViewRouterProps {
  currentView: ViewType;
  newsletters: Newsletter[];
  selectedArticleId: number;
  userProfile: UserProfile;
  accountSettings: AccountSettings;
  newPost: NewPostData;
  loginData: { email: string; password: string };
  signupData: { name: string; email: string; password: string; confirmPassword: string; department: string };
  newComment: string;
  searchQuery: string;
  likedPosts: Set<number>;
  bookmarkedPosts: Set<number>;
  stats: StatItem[];
  onViewChange: (view: string) => void;
  onLogin: (e: React.FormEvent) => void;
  onSignup: (e: React.FormEvent) => void;
  onCreatePost: (e: React.FormEvent) => void;
  onAddComment: (postId: number) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
  onToggleLike: (postId: number) => void;
  onToggleBookmark: (postId: number) => void;
  onViewArticle: (articleId: number) => void;
  onShare: (newsletter: Newsletter) => void;
  setLoginData: (data: any) => void;
  setSignupData: (data: any) => void;
  setNewPost: (data: NewPostData) => void;
  setNewComment: (comment: string) => void;
  setSearchQuery: (query: string) => void;
  setUserProfile: (profile: UserProfile) => void;
  setAccountSettings: (settings: AccountSettings) => void;
}

export const ViewRouter = memo(function ViewRouter(props: ViewRouterProps) {
  const {
    currentView,
    newsletters,
    selectedArticleId,
    userProfile,
    accountSettings,
    newPost,
    loginData,
    signupData,
    newComment,
    searchQuery,
    likedPosts,
    bookmarkedPosts,
    stats,
    onViewChange,
    onLogin,
    onSignup,
    onCreatePost,
    onAddComment,
    onDeleteComment,
    onToggleLike,
    onToggleBookmark,
    onViewArticle,
    onShare,
    setLoginData,
    setSignupData,
    setNewPost,
    setNewComment,
    setSearchQuery,
    setUserProfile,
    setAccountSettings
  } = props;

  switch (currentView) {
    case 'landing':
      return <LandingView setCurrentView={onViewChange} />;
    
    case 'login':
      return (
        <LoginView
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={onLogin}
          setCurrentView={onViewChange}
        />
      );
    
    case 'signup':
      return (
        <SignupView
          signupData={signupData}
          setSignupData={setSignupData}
          handleSignup={onSignup}
          setCurrentView={onViewChange}
        />
      );
    
    case 'create':
      return (
        <CreatePostView
          newPost={newPost}
          setNewPost={setNewPost}
          handleCreatePost={onCreatePost}
          setCurrentView={onViewChange}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'profile':
      return (
        <ProfileView
          setCurrentView={onViewChange}
          userProfile={userProfile}
          bookmarkedPosts={bookmarkedPosts}
          newsletters={newsletters}
          viewArticle={onViewArticle}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'edit-profile':
      return (
        <EditProfileView
          setCurrentView={onViewChange}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'settings':
      return (
        <AccountSettingsView
          setCurrentView={onViewChange}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'feedback':
      return (
        <FeedbackView
          setCurrentView={onViewChange}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'article':
      const article = newsletters.find(n => n.id === selectedArticleId) || newsletters[0];
      return (
        <ArticleView
          article={article}
          likedPosts={likedPosts}
          bookmarkedPosts={bookmarkedPosts}
          toggleLike={onToggleLike}
          toggleBookmark={onToggleBookmark}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={onAddComment}
          handleDeleteComment={onDeleteComment}
          setCurrentView={onViewChange}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'task-manager':
      return (
        <TaskManagerView
          setCurrentView={onViewChange}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    case 'survey':
      return (
        <SurveyView
          setCurrentView={onViewChange}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    
    default:
      return (
        <HomeView
          newsletters={newsletters}
          likedPosts={likedPosts}
          bookmarkedPosts={bookmarkedPosts}
          toggleLike={onToggleLike}
          toggleBookmark={onToggleBookmark}
          viewArticle={onViewArticle}
          setCurrentView={onViewChange}
          stats={stats}
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
          handleShare={onShare}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      );
  }
});