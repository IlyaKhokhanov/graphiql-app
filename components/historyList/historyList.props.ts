type ClientValue = {
  id: number;
  url: string;
};

export interface HistoryListProps {
  locale: string;
  list: ClientValue[];
}
