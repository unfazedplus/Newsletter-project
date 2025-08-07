import React, { memo } from 'react';
import {
  User,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Bookmark,
} from "lucide-react";
import type { Newsletter } from "../../types/newsletter";

interface NewsletterCardProps {
  newsletter: Newsletter;
  isLiked: boolean;
  isBookmarked: boolean;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
  onViewArticle: () => void;
  onShare: () => void;
}

const NewsletterCard = memo(function NewsletterCard({
  newsletter,
  isLiked,
  isBookmarked,
  onToggleLike,
  onToggleBookmark,
  onViewArticle,
  onShare,
}: NewsletterCardProps) {
  return (
    <article className="newsletter-card">
      <div className="newsletter-content">
        <div className="newsletter-header">
          <div className="newsletter-body">
            <div className="newsletter-meta">
              <span className="category-badge">{newsletter.category}</span>
              <div className="author-info">
                <div className="author-avatar">
                  <User />
                </div>
                <span className="author-name">{newsletter.author}</span>
                <span>•</span>
                <span>{newsletter.date}</span>
              </div>
            </div>

            <h2 className="newsletter-title" onClick={onViewArticle}>
              {newsletter.title}
            </h2>

            <p className="newsletter-excerpt">{newsletter.excerpt}</p>

            {newsletter.images && newsletter.images.length > 0 && (
              <div className="newsletter-images">
                {newsletter.images.length === 1 ? (
                  <img 
                    src={newsletter.images[0]} 
                    alt="Post image" 
                    className="single-image"
                    onClick={onViewArticle}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="image-grid">
                    {newsletter.images.slice(0, 4).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`Post image ${index + 1}`} 
                        className="grid-image"
                        onClick={onViewArticle}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ))}
                    {newsletter.images.length > 4 && (
                      <div className="more-images" onClick={onViewArticle}>
                        +{newsletter.images.length - 4}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="tags-container">
              {newsletter.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="newsletter-footer">
          <div className="footer-actions">
            <button
              onClick={onToggleLike}
              className={`action-button like-button ${isLiked ? "active" : ""}`}
            >
              <Heart />
              <span>{newsletter.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button
              className="action-button comment-button"
              onClick={onViewArticle}
            >
              <MessageCircle />
              <span>{newsletter.comments}</span>
            </button>
            <button className="action-button share-button" onClick={onShare}>
              <Share2 />
              <span>Share</span>
            </button>
            <div className="views-count">
              <Eye />
              <span>{newsletter.views}</span>
            </div>
          </div>
          <button
            onClick={onToggleBookmark}
            className={`bookmark-button ${isBookmarked ? "active" : ""}`}
          >
            <Bookmark />
          </button>
        </div>
      </div>
    </article>
  );
});

export { NewsletterCard };
