export type ErrorType = 'event' | 'info' | 'maintenance' | 'error' | 'tech-info';

interface IError {
  [key: string]: ErrorType;
};

export const error: IError = {
  '1d': 'event', // Green
  '1a': 'info',  // Blue
  '1b': 'maintenance', // Желтые
  '1c': 'maintenance',
  '2': 'error',
  '2d': 'error',
  '3a': 'tech-info', 
  '3b': 'tech-info',
  // "-1": 'error',
  // "62": "event",
  // "69": "tech-info",
  // "9664": "error",
};

export const eventTypes: ErrorType[] = ['event', 'info', 'maintenance', 'error', 'tech-info']