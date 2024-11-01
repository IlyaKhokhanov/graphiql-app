type ClientValue = {
  id: number;
  url: string;
  link: string;
  title: string;
};

export interface IHistoryValue {
  rest: ClientValue[];
  graph: ClientValue[];
}
