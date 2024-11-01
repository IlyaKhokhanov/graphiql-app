type clientValue = {
  id: number;
  url: string;
  link: string;
  title: string;
};

export type userLS = {
  rest: clientValue[];
  graph: clientValue[];
};

export interface IaddToLS {
  id: string;
  url: string;
  link: string;
  title: string;
  client: 'rest' | 'graph';
}
