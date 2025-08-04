import React from "react";
import { User } from "lucide-react";
import type { NewPostData, AccountSettings } from "../../types/newsletter";
import { ThemeToggle } from "../ThemeToggle";
import { ImageUpload } from "./ImageUpload";
import { Logo } from "../Logo";
import "../../styles/image-upload.css";

interface CreatePostViewProps {
  newPost: NewPostData;
  setNewPost: (post: NewPostData) => void;
  handleCreatePost: (e: React.FormEvent) => void;
  setCurrentView: (view: "login" | "home" | "article" | "create") => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function CreatePostView({
  newPost,
  setNewPost,
  handleCreatePost,
  setCurrentView,
  accountSettings,
  setAccountSettings
}: CreatePostViewProps) {
  return (
    <div>
      <header className="header">
        <div className="container header-container">
          <div className="header-brand">
            <button
              onClick={() => setCurrentView("home")}
              className="header-logo"
            >
              <Logo />
            </button>
            <span className="header-divider">|</span>
            <span className="header-title">Create New Post</span>
          </div>
          <div className="header-actions">
            <ThemeToggle 
              accountSettings={accountSettings} 
              setAccountSettings={setAccountSettings}
              className="header-theme-toggle"
            />
            <div className="avatar">
              <User className="avatar-icon" />
            </div>
          </div>
        </div>
      </header>

      <div className="article-container">
        <form onSubmit={handleCreatePost} className="create-post-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="form-input"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={newPost.category}
              onChange={(e) =>
                setNewPost({ ...newPost, category: e.target.value })
              }
              className="form-input"
              required
            >
              <option value="Product Updates">Product Updates</option>
              <option value="Team News">Team News</option>
              <option value="Customer Stories">Customer Stories</option>
              <option value="Tech Updates">Tech Updates</option>
              <option value="Company News">Company News</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              value={newPost.excerpt}
              onChange={(e) =>
                setNewPost({ ...newPost, excerpt: e.target.value })
              }
              className="form-textarea"
              placeholder="Write your post content here..."
              rows={6}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input
              type="text"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              className="form-input"
              placeholder="news, update, feature"
            />
          </div>

          <div className="form-group">
            <ImageUpload
              images={newPost.images}
              onImagesChange={(images) => setNewPost({ ...newPost, images })}
              maxImages={5}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => setCurrentView("home")}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
