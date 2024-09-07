import { DocumentNode } from '@apollo/client';

export type QueryEditorProps = {
  query: DocumentNode | string;
  setQuery: (query: string) => void;
};
