import { HeaderType, SchemaType } from '@/components';
import { DocumentNode } from '@apollo/client';

export type InitialStateType = {
  endpoint: string;
  sdlEndpoint: string;
  headers: HeaderType[];
  query: DocumentNode | string;
  variables: string;
  body: Record<string, string>;
  schema: SchemaType | null;
  statusCode: string | null;
  errorMessage: string;
  isFetched: boolean;
  isFetchedSchema: boolean;
};

export interface ChangeInputI {
  value: string;
  id: string;
  field: string;
}
