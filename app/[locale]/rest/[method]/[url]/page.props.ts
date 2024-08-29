export interface IRouteProps {
  params: {
    locale: string;
    method: string;
    url: string;
    body?: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
