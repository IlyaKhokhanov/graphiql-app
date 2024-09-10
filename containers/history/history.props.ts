type ClientValue = {
  id: number;
  url: string;
};

export interface IHistoryValue {
  rest: ClientValue[];
  graph: ClientValue[];
}
