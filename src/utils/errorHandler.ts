export const handleError = (error: unknown, context: string): void => {
  console.error(`Error in ${context}:`, error);
};

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      handleError(error, 'localStorage.getItem');
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      handleError(error, 'localStorage.setItem');
      return false;
    }
  },
  
  parseJSON: <T>(value: string | null, fallback: T): T => {
    if (!value) return fallback;
    try {
      return JSON.parse(value);
    } catch (error) {
      handleError(error, 'JSON.parse');
      return fallback;
    }
  }
};