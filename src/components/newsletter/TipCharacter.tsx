import { useState, useCallback, memo } from 'react';
import { X, Lightbulb } from 'lucide-react';
import { TIPS } from '../../constants/tips';

export const TipCharacter = memo(function TipCharacter() {
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateTip = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setCurrentTip(randomTip);
    setShowTip(true);
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  const closeTip = useCallback(() => {
    setShowTip(false);
  }, []);

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
});