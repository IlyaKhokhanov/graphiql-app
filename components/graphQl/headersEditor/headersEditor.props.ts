export type HeaderType = {
  id: string;
  key: string;
  value: string;
};

export type HeadersEditorProps = {
  initialHeaders?: HeaderType[];
};
