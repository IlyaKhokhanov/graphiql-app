export type GraphQlDocumentationProps = {
  schema: SchemaType | null;
  errorMessage: string;
  locale: string;
};

export type SchemaType = {
  types: Array<{
    name: string;
  }>;
};
