
import { Header } from "./Header";
import { StatsGrid } from "./StatsGrid";
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import { TipCharacter } from "./TipCharacter";
import "../../styles/tip-character.css";
import type { Newsletter, StatItem, ViewType, AccountSettings } from "../../types/newsletter";

interface HomeViewProps {
  newsletters: Newsletter[];
  likedPosts: Set<number>;
  bookmarkedPosts: Set<number>;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
  viewArticle: (articleId: number) => void;
  setCurrentView: (view: ViewType) => void;
  stats: StatItem[];
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleShare: (newsletter: Newsletter) => void;
}



export function HomeView({
  newsletters,
  likedPosts,
  bookmarkedPosts,
  toggleLike,
  toggleBookmark,
  viewArticle,
  setCurrentView,
  stats,
  accountSettings,
  setAccountSettings,
  searchQuery,
  setSearchQuery,
  handleShare
}: HomeViewProps) {

const handleViewChange = (view: string) => {
  setCurrentView(view as ViewType);
};

  return (
    <div>
      <Header
        setCurrentView={handleViewChange}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <TipCharacter />

      <div className="main-container">
        <StatsGrid stats={stats}/>

        <div className="content-layout">
          <MainContent
            newsletters={newsletters}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
            toggleLike={toggleLike}
            toggleBookmark={toggleBookmark}
            viewArticle={viewArticle}
            searchQuery={searchQuery}
            handleShare={handleShare}
          />

          <Sidebar setCurrentView={handleViewChange} />
        </div>
      </div>
    </div>
  );
}