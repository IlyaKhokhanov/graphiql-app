type ClientValue = {
  id: number;
  url: string;
  link: string;
  title: string;
};

export interface HistoryListProps {
  locale: string;
  list: ClientValue[];
}
