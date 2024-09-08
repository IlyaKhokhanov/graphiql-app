export type GraphQlDocumentationProps = {
  schema: SchemaType | null;
  errorMessage: string;
};

export type SchemaType = {
  types: Array<{
    name: string;
  }>;
};
