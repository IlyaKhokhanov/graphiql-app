import { HeaderType, SchemaType } from '@/components';
import { DocumentNode } from 'graphql';

export type ApolloFetchParam = {
  endpoint: string;
  headers: HeaderType[];
  query: string | DocumentNode;
  variables: string;
  callbackSetBody: (data: Record<string, string>) => void;
  callbackSetStatus: (statusCode: number) => void;
  callbackSetIsLoading: (fetching: boolean) => void;
};

export type ApolloGetSchemaParam = {
  sdlEndpoint: string;
  callbackSetSchema: (schema: SchemaType | null) => void;
  callbackSetErrorMessage: (message: string) => void;
  callbackSetIsLoadingSchema: (fetching: boolean) => void;
};
