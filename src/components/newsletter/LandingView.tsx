import { Hero } from './Hero';
import type { ViewType } from '../../types/newsletter';
import '../../styles/hero.css';
import '../../styles/newsletter.css';

interface LandingViewProps {
  setCurrentView: (view: ViewType) => void;
}

export function LandingView({ setCurrentView }: LandingViewProps) {
  return (
    <div>
      <Hero setCurrentView={setCurrentView} />
    </div>
  );
}