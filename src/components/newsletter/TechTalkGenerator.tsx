import { useState, useCallback } from 'react';
import { X, RefreshCw, Calendar, Users, Clock } from 'lucide-react';
import { TECH_CATEGORIES, DURATIONS, AUDIENCES, TECH_SEEDS } from '../../constants/techTalk';
import { sanitizeHtml } from '../../utils/sanitize';

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

  const generateTechTalk = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Fetch tech talk content from JSONPlaceholder and enhance it
      const contentResponse = await fetch('https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * 100 + 1));
      const contentData = await contentResponse.json();
      
      // Fetch tech image from Picsum with tech-related seed
      const randomSeed = TECH_SEEDS[Math.floor(Math.random() * TECH_SEEDS.length)];
      const imageUrl = `https://picsum.photos/seed/${randomSeed}${Date.now()}/400/250`;
      
      // Transform the content into tech talk format
      const randomCategory = TECH_CATEGORIES[Math.floor(Math.random() * TECH_CATEGORIES.length)];
      const randomDuration = DURATIONS[Math.floor(Math.random() * DURATIONS.length)];
      const randomAudience = AUDIENCES[Math.floor(Math.random() * AUDIENCES.length)];
      
      // Create tech-focused title and description
      const techTitle = sanitizeHtml(`${randomCategory}: ${contentData.title.split(' ').slice(0, 4).join(' ').replace(/^\w/, (c: string) => c.toUpperCase())}`);
      const techDescription = sanitizeHtml(`${contentData.body.substring(0, 120)}... This session will cover practical implementations and real-world applications.`);

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
      const fallbackCategory = TECH_CATEGORIES[Math.floor(Math.random() * TECH_CATEGORIES.length)];
      
      const newTechTalk: TechTalk = {
        title: sanitizeHtml(`${fallbackCategory}: Modern Development Practices`),
        description: sanitizeHtml('Explore cutting-edge technologies and methodologies in this comprehensive tech talk session.'),
        category: fallbackCategory,
        duration: DURATIONS[Math.floor(Math.random() * DURATIONS.length)],
        audience: AUDIENCES[Math.floor(Math.random() * AUDIENCES.length)],
        image: `https://picsum.photos/seed/tech${Date.now()}/400/250`
      };
      setTechTalk(newTechTalk);
    }
    
    setIsLoading(false);
  }, []);

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