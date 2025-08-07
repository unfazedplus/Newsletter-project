// Responsive utility functions and constants

export const BREAKPOINTS = {
  mobile: 639,
  tablet: 1023,
  desktop: 1024
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}

// Get current breakpoint based on window width
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width <= BREAKPOINTS.mobile) {
    return 'mobile';
  } else if (width <= BREAKPOINTS.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// Check if current screen matches breakpoint
export function isBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  
  switch (breakpoint) {
    case 'mobile':
      return width <= BREAKPOINTS.mobile;
    case 'tablet':
      return width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet;
    case 'desktop':
      return width > BREAKPOINTS.tablet;
    default:
      return false;
  }
}

// Touch device detection
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

// Viewport size helpers
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// Debounced resize handler
export function createResizeHandler(
  callback: () => void,
  delay: number = 150
): () => void {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}