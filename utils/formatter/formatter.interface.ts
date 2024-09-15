export interface IFormatter {
  query: string;
  type: 'rest' | 'graph' | 'var';
  contentType?: 'application/json' | 'text/plain';
  onCallbackSetError?: (message: string) => void;
  onCallbackSetBody?: (body: string) => void;
}
