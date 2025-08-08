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