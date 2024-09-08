import { SchemaType } from '@/components';
import { DocumentNode } from '@apollo/client';

export type InitialStateType = {
  endpoint: string;
  sdlEndpoint: string;
  headers: Array<Record<string, string>>;
  query: DocumentNode | string;
  variables: string;
  body: Record<string, string>;
  schema: SchemaType | null;
  statusCode: string | null;
  errorMessage: string;
};
