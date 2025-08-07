import { useState, useCallback } from 'react';
import { X, RefreshCw, Calendar, Users, Clock } from 'lucide-react';


interface TechTalk {
  title: string;
  description: string;
  category: string;
  duration: string;
  audience: string;
  image: string;
}



export function TechTalkGenerator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [techTalk, setTechTalk] = useState<TechTalk | null>(null);
  const [isLoading, setIsLoading] = useState(false);

const durations = ["30 minutes", "45 minutes", "1 hour", "1.5 hours"];
const audiences = ["Beginners", "Intermediate", "Advanced", "All Levels"];

  const generateTechTalk = async () => {
    setIsLoading(true);
    
    try {
      // Fetch tech talk content from JSONPlaceholder and enhance it
      const contentResponse = await fetch('https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * 100 + 1));
      const contentData = await contentResponse.json();
      
      // Fetch tech image from Picsum with tech-related seed
      const techSeeds = ['tech', 'code', 'computer', 'programming', 'software', 'data', 'ai', 'web'];
      const randomSeed = techSeeds[Math.floor(Math.random() * techSeeds.length)];
      const imageUrl = `https://picsum.photos/seed/${randomSeed}${Date.now()}/400/250`;
      
      // Transform the content into tech talk format
      const techCategories = ['AI/ML', 'Web Development', 'Cloud Computing', 'Data Science', 'Mobile Development', 'Blockchain'];
      const randomCategory = techCategories[Math.floor(Math.random() * techCategories.length)];
      const randomDuration = durations[Math.floor(Math.random() * durations.length)];
      const randomAudience = audiences[Math.floor(Math.random() * audiences.length)];
      
      // Create tech-focused title and description
      const techTitle = `${randomCategory}: ${contentData.title.split(' ').slice(0, 4).join(' ').replace(/^\w/, (c: string) => c.toUpperCase())}`;
      const techDescription = `${contentData.body.substring(0, 120)}... This session will cover practical implementations and real-world applications.`;

      const newTechTalk: TechTalk = {
        title: techTitle,
        description: techDescription,
        category: randomCategory,
        duration: randomDuration,
        audience: randomAudience,
        image: imageUrl
      };

      setTechTalk(newTechTalk);
    } catch {
      // Fallback with Lorem Picsum image
      const fallbackCategories = ['AI/ML', 'Web Development', 'Cloud Computing'];
      const fallbackCategory = fallbackCategories[Math.floor(Math.random() * fallbackCategories.length)];
      
      const newTechTalk: TechTalk = {
        title: `${fallbackCategory}: Modern Development Practices`,
        description: 'Explore cutting-edge technologies and methodologies in this comprehensive tech talk session.',
        category: fallbackCategory,
        duration: durations[Math.floor(Math.random() * durations.length)],
        audience: audiences[Math.floor(Math.random() * audiences.length)],
        image: `https://picsum.photos/seed/tech${Date.now()}/400/250`
      };
      setTechTalk(newTechTalk);
    }
    
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="tech-talk-overlay" onClick={onClose}>
      <div className="tech-talk-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tech-talk-header">
          <h2>💻 Tech Talk Ideas Generator</h2>
          <button className="tech-talk-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="tech-talk-content">
          {!techTalk ? (
            <div className="tech-talk-welcome">
              <div className="welcome-icon">💡</div>
              <h3>Generate Your Next Tech Talk!</h3>
              <p>Click the button below to get a random tech talk idea with all the details you need.</p>
              <button 
                className="generate-btn" 
                onClick={generateTechTalk}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="spinning" size={16} />
                    Generating...
                  </>
                ) : (
                  'Generate Tech Talk Idea'
                )}
              </button>
            </div>
          ) : (
            <div className="tech-talk-card">
              <div className="tech-talk-image">
                <img 
                  src={techTalk.image} 
                  alt={techTalk.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/fallback${Date.now()}/400/250`;
                  }}
                />
                <div className="category-badge">{techTalk.category}</div>
              </div>
              
              <div className="tech-talk-details">
                <h3 className="tech-talk-title">{techTalk.title}</h3>
                <p className="tech-talk-description">{techTalk.description}</p>
                
                <div className="tech-talk-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{techTalk.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{techTalk.audience}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Schedule Now</span>
                  </div>
                </div>
                
                <div className="tech-talk-actions">
                  <button 
                    className="generate-btn secondary" 
                    onClick={generateTechTalk}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="spinning" size={16} />
                        Generating...
                      </>
                    ) : (
                      'Generate Another'
                    )}
                  </button>
                  <button className="schedule-btn">
                    Schedule Talk
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}