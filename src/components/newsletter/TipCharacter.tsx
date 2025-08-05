import { useState } from 'react';
import { X, Lightbulb } from 'lucide-react';

const tips = [
  "💡 Use keyboard shortcuts Ctrl+K to quickly search through posts!",
  "🚀 Tag your posts properly to help colleagues find relevant content faster.",
  "📝 Keep your post titles clear and descriptive for better engagement.",
  "🎯 Use the bookmark feature to save important posts for later reference.",
  "⭐ Like posts to show appreciation and boost team morale!",
  "🔍 Use specific keywords in your search to find exactly what you need.",
  "📊 Check the stats grid to see trending topics and engagement metrics.",
  "🎨 Upload images to make your posts more visually appealing.",
  "💬 Engage with comments to build stronger team connections.",
  "📅 Use the calendar to plan your content posting schedule.",
  "🏷️ Follow trending hashtags to stay updated on company initiatives.",
  "✨ Regular posting keeps the community active and informed!",
  "🎪 Share success stories to inspire and motivate your teammates.",
  "🔔 Adjust your notification settings to stay informed without overwhelm.",
  "🌟 Quality content gets more engagement than frequent low-value posts."
];

export function TipCharacter() {
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateTip = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
    setShowTip(true);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeTip = () => {
    setShowTip(false);
  };

  return (
    <>
      <div className="tip-character" onClick={generateTip}>
        <div className={`character-avatar ${isAnimating ? 'bounce' : ''}`}>
          <Lightbulb size={20} />
        </div>
        <div className="character-speech-bubble">
          Click me for tips!
        </div>
      </div>

      {showTip && (
        <div className="tip-overlay" onClick={closeTip}>
          <div className="tip-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tip-header">
              <h3>💡 Tip of the Week</h3>
              <button className="tip-close" onClick={closeTip}>
                <X size={16} />
              </button>
            </div>
            <div className="tip-content">
              {currentTip}
            </div>
            <div className="tip-footer">
              <button className="tip-new-btn" onClick={generateTip}>
                Get Another Tip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}