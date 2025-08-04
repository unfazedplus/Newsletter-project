import { Filter } from "lucide-react";
import { NewsletterCard } from "./NewsletterCard";
import type { Newsletter } from "../../types/newsletter";

interface MainContentProps {
  newsletters: Newsletter[];
  likedPosts: Set<number>;
  bookmarkedPosts: Set<number>;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
  viewArticle: (articleId: number) => void;
  searchQuery: string;
  handleShare: (newsletter: Newsletter) => void;
}


// import { NewsletterCard } from "./NewsletterCard";              // import { Filter } from "lucide-react";

export function MainContent({
  newsletters,
  likedPosts,
  bookmarkedPosts,
  toggleLike,
  toggleBookmark,
  viewArticle,
  searchQuery,
  handleShare
}: MainContentProps) {
    const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="main-content">
      <div className="content-header">
        <h1 className="content-title">Latest Updates</h1>
        <div>
          <button className="btn-filter">
            <Filter />
            <span>Filter</span>
          </button>
        </div>
      </div>
     {searchQuery && (
        <div style={{ marginBottom: '20px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', fontSize: '14px', color: '#0369a1' }}>
          {filteredNewsletters.length === 0 
            ? `No posts found matching "${searchQuery}"` 
            : `Found ${filteredNewsletters.length} post${filteredNewsletters.length === 1 ? '' : 's'} matching "${searchQuery}"`
          }
        </div>
      )}

      <div className="newsletter-list">
          {filteredNewsletters.map((newsletter) => (
          <NewsletterCard
            key={newsletter.id}
            newsletter={newsletter}
            isLiked={likedPosts.has(newsletter.id)}
            isBookmarked={bookmarkedPosts.has(newsletter.id)}
            onToggleLike={() => toggleLike(newsletter.id)}
            onToggleBookmark={() => toggleBookmark(newsletter.id)}
            onViewArticle={() => viewArticle(newsletter.id)}
            onShare={() => handleShare(newsletter)}
          />
        ))}
      </div>
    </div>
  );
}
