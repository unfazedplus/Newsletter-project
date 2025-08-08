import React from 'react';

function useResponsive() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [screenSize, setScreenSize] = React.useState({ width: 0, height: 0 });
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      if (width <= 639) {
        setBreakpoint('mobile');
      } else if (width <= 1023) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
    
    const debouncedCheckBreakpoint = () => {
      clearTimeout((window as Window & { resizeTimeout?: number }).resizeTimeout);
      (window as Window & { resizeTimeout?: ReturnType<typeof setTimeout> }).resizeTimeout = setTimeout(checkBreakpoint, 150);
    };
    
    checkBreakpoint();
    window.addEventListener('resize', debouncedCheckBreakpoint);
    
    return () => {
      window.removeEventListener('resize', debouncedCheckBreakpoint);
      clearTimeout((window as Window & { resizeTimeout?: number }).resizeTimeout);
    };
  }, []);
  
  return {
    breakpoint,
    screenSize,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isSmallScreen: screenSize.width <= 639,
    isMediumScreen: screenSize.width > 639 && screenSize.width <= 1023,
    isLargeScreen: screenSize.width > 1023
  };
}

export default useResponsive;