import { useCallback } from 'react';
import { validateInput } from '../utils/validation';
import { sanitizeHtml, sanitizeInput } from '../utils/sanitize';

export function useInputValidation() {
  const validateAndSanitize = useCallback((input: string, type: 'html' | 'text' = 'text'): string => {
    if (!validateInput(input)) {
      throw new Error('Invalid input detected');
    }
    return type === 'html' ? sanitizeHtml(input) : sanitizeInput(input);
  }, []);

  const validateNumber = useCallback((value: any): number => {
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      throw new Error('Invalid number');
    }
    return num;
  }, []);

  return { validateAndSanitize, validateNumber };
}