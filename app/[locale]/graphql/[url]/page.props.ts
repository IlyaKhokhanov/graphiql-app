export interface IRouteProps {
  params: {
    locale: string;
    url: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
