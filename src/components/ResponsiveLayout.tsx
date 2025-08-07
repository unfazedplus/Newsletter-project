import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  return (
    <div className={`app-layout ${className}`}>
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
  const gridClass = `grid grid-cols-${cols} gap-${gap === 'sm' ? '2' : gap === 'md' ? '4' : '6'} ${className}`;
  
  return (
    <div className={gridClass}>
      {children}
    </div>
  );
}

interface ResponsivePageProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export function ResponsivePage({ children, sidebar, className = '' }: ResponsivePageProps) {
  const layoutClass = sidebar ? 'page-layout with-sidebar' : 'page-layout';
  
  return (
    <div className={`${layoutClass} ${className}`}>
      <div className="content-area">
        {children}
      </div>
      {sidebar && (
        <div className="sidebar-area">
          {sidebar}
        </div>
      )}
    </div>
  );
}

export function useResponsive() {
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
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(checkBreakpoint, 150);
    };
    
    checkBreakpoint();
    window.addEventListener('resize', debouncedCheckBreakpoint);
    
    return () => {
      window.removeEventListener('resize', debouncedCheckBreakpoint);
      clearTimeout((window as any).resizeTimeout);
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

// Responsive utility functions
export function getResponsiveClasses(baseClass: string, responsive: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}) {
  let classes = baseClass;
  
  if (responsive.mobile) {
    classes += ` ${responsive.mobile}`;
  }
  if (responsive.tablet) {
    classes += ` md:${responsive.tablet}`;
  }
  if (responsive.desktop) {
    classes += ` lg:${responsive.desktop}`;
  }
  
  return classes;
}

export function getResponsiveValue<T>(value: T | {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}, breakpoint: 'mobile' | 'tablet' | 'desktop'): T {
  if (typeof value === 'object' && value !== null && 'mobile' in value) {
    const responsiveValue = value as {
      mobile?: T;
      tablet?: T;
      desktop?: T;
    };
    
    switch (breakpoint) {
      case 'mobile':
        return responsiveValue.mobile ?? responsiveValue.tablet ?? responsiveValue.desktop as T;
      case 'tablet':
        return responsiveValue.tablet ?? responsiveValue.desktop ?? responsiveValue.mobile as T;
      case 'desktop':
        return responsiveValue.desktop ?? responsiveValue.tablet ?? responsiveValue.mobile as T;
      default:
        return responsiveValue.desktop as T;
    }
  }
  
  return value as T;
}

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function ResponsiveImage({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw',
  loading = 'lazy'
}: ResponsiveImageProps) {
  return (
    <img 
      src={src}
      alt={alt}
      className={`responsive-image ${className}`}
      sizes={sizes}
      loading={loading}
    />
  );
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  size?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  } | string;
  className?: string;
}

export function ResponsiveText({ children, size = 'text-base', className = '' }: ResponsiveTextProps) {
  const textClass = typeof size === 'string' 
    ? size 
    : getResponsiveClasses('', size);
    
  return (
    <span className={`${textClass} ${className}`}>
      {children}
    </span>
  );
}