export interface ClientsHeadersProps {
  locale: string;
  list: InputsT[];
  changeInput: (val: string, id: string, field: 'key' | 'value') => void;
  deleteInput: (id: string) => void;
  addInput: () => void;
  isHeader?: boolean;
}

interface InputsT {
  id: string;
  key: string;
  value: string;
}
