import { HeaderType, SchemaType } from '@/components';
import { DocumentNode } from 'graphql';

export type ApolloFetchParam = {
  endpoint: string;
  headers: HeaderType[];
  query: string | DocumentNode;
  variables: string;
  callbackSetBody: (data: Record<string, string>) => void;
  callbackSetStatus: (statusCode: number) => void;
};

export type ApolloGetSchemaParam = {
  endpoint: string;
  sdlEndpoint: string;
  callbackSetSchema: (schema: SchemaType) => void;
  callbackSetErrorMessage: (message: string) => void;
};
