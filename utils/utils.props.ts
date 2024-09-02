type clientValue = {
  id: number;
  url: string;
  options: string;
};

export type userLS = {
  rest: clientValue[];
  graph: clientValue[];
};
