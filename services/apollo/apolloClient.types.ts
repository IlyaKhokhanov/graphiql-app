export type CustomApolloError = {
  status: number;
  message: string;
};

export type ApolloServiceParam = {
  uri: string;
  headersObject: Record<string, string>;
  onErrorCallback: ({ message, status }: CustomApolloError) => void;
};
