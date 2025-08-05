import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  return (
    <div className={`responsive-layout ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  className?: string;
}

export function ResponsiveContainer({ 
  children, 
  size = 'lg', 
  className = '' 
}: ResponsiveContainerProps) {
  const containerClass = `container-${size} ${className}`;
  
  return (
    <div className={containerClass}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = 1, 
  gap = 'md', 
  className = '' 
}: ResponsiveGridProps) {
  const gridClass = `grid-responsive grid-${cols} gap-${gap === 'sm' ? '2' : gap === 'md' ? '4' : '6'} ${className}`;
  
  return (
    <div className={gridClass}>
      {children}
    </div>
  );
}

export function useResponsive() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth <= 480) {
        setBreakpoint('mobile');
      } else if (window.innerWidth <= 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop'
  };
}