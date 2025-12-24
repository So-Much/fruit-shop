/**
 * Utility function to merge class names
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: (string | undefined | null | false | { [key: string]: boolean })[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  // Remove duplicates and join
  return [...new Set(classes)].join(' ');
}

/**
 * Format number as Vietnamese currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Format grams to kg display
 */
export function formatGrams(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams} g`;
}
