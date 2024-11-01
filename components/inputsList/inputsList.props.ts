export interface InputsListProps {
  locale: string;
  list: InputsT[];
  changeInput: (val: string, id: string, field: 'key' | 'value') => void;
  deleteInput: (id: string) => void;
}

interface InputsT {
  id: string;
  key: string;
  value: string;
}
