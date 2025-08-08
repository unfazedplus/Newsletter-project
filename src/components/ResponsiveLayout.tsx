import React from 'react';
import { getResponsiveClasses } from '../utils/responsive';


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