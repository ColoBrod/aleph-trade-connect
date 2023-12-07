export type ErrorType = 'event' | 'info' | 'maintenance' | 'error' | 'tech-info';

interface IError {
  [key: string]: ErrorType;
};

export const error: IError = {
  "-1": 'error',
  "62": "event",
  "69": "tech-info",
  "9664": "error",

};