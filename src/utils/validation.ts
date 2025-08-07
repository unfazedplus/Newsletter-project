export const validateInput = (input: string, maxLength: number = 1000): boolean => {
  if (typeof input !== 'string') return false;
  if (input.length > maxLength) return false;
  
  const dangerousPatterns = [
    /\$where/i,
    /\$ne/i,
    /\$gt/i,
    /\$lt/i,
    /\$regex/i,
    /javascript:/i,
    /eval\(/i,
    /function\(/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

export const sanitizeQuery = (query: any): any => {
  if (typeof query === 'string') {
    return query.replace(/[{}$]/g, '');
  }
  return query;
};