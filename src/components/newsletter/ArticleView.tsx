import {
  Bell,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  Trash2,
} from "lucide-react";
import type { Newsletter, AccountSettings } from "../../types/newsletter";
import { ThemeToggle } from "../ThemeToggle";
import { Logo } from "../Logo";

interface ArticleViewProps {
  article: Newsletter;
  likedPosts: Set<number>;
  bookmarkedPosts: Set<number>;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: (postId: number) => void;
  handleDeleteComment: (postId: number, commentId: number) => void;
  setCurrentView: (view: "login" | "home" | "article" | "create") => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function ArticleView({
  article,
  likedPosts,
  bookmarkedPosts,
  toggleLike,
  toggleBookmark,
  newComment,
  setNewComment,
  handleAddComment,
  handleDeleteComment,
  setCurrentView,
  accountSettings,
  setAccountSettings
}: ArticleViewProps) {
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
            <span className="header-title">Staff Newsletter</span>
          </div>
          <div className="header-actions">
            <Bell className="icon-button" />
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
        <button onClick={() => setCurrentView("home")} className="back-button">
          ← Back to Newsletter
        </button>

        <article className="article-card">
          <div className="article-header">
            <span className="category-badge">{article.category}</span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <div className="article-author">
                <div className="avatar">
                  <User />
                </div>
                <div>
                  <span className="author-name">{article.author}</span>
                  <span> • {article.role}</span>
                </div>
              </div>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.views} views</span>
            </div>
          </div>

          <div className="article-content">
            <p className="article-lead">{article.excerpt}</p>
            <p className="article-text">
              Our product team has been working tirelessly to bring you the most
              innovative features that will revolutionize how our customers
              discover and purchase quality products. The upcoming quarter
              promises to be our most exciting yet.
            </p>
            <h2 className="article-subheading">Key Highlights</h2>
            <ul className="article-list">
              <li className="article-list-item">
                <span className="list-bullet">•</span>
                <span>
                  AI-powered product recommendations based on customer behavior
                </span>
              </li>
              <li className="article-list-item">
                <span className="list-bullet">•</span>
                <span>Enhanced vendor dashboard with real-time analytics</span>
              </li>
              <li className="article-list-item">
                <span className="list-bullet">•</span>
                <span>Mobile app redesign for improved user experience</span>
              </li>
            </ul>
          </div>

          <div className="article-footer">
            <div className="footer-actions">
              <button
                onClick={() => toggleLike(article.id)}
                className={`action-button like-button ${
                  likedPosts.has(article.id) ? "active" : ""
                }`}
              >
                <Heart className={likedPosts.has(article.id) ? "fill" : ""} />
                <span>
                  {article.likes + (likedPosts.has(article.id) ? 1 : 0)}
                </span>
              </button>
              <button className="action-button comment-button">
                <MessageCircle />
                <span>{article.comments}</span>
              </button>
              <button className="action-button share-button">
                <Share2 />
                <span>Share</span>
              </button>
            </div>
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`bookmark-button ${
                bookmarkedPosts.has(article.id) ? "active" : ""
              }`}
            >
              <Bookmark
                className={bookmarkedPosts.has(article.id) ? "fill" : ""}
              />
            </button>
          </div>

          <div className="comments-section">
            <h3 className="comments-title">Comments ({article.comments})</h3>

            <div className="comment-form">
              <div className="comment-input-container">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="comment-input"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={() => handleAddComment(article.id)}
                  className="comment-submit"
                  disabled={!newComment.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

            <div className="comments-list">
              {article.commentsList &&
                article.commentsList.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      <User size={18} />
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                    {comment.author === "You" && (
                      <button
                        onClick={() =>
                          handleDeleteComment(article.id, comment.id)
                        }
                        className="comment-delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
