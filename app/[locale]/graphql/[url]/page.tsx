import { getIntl } from '@/services/intl/intl';

type RouteProps = {
  params: {
    locale: string;
    url: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const GraphiQLClient = async ({ params }: RouteProps) => {
  const intl = await getIntl(params.locale);

  return (
    <>
      <h1>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>
      <p>
        {intl.formatMessage({ id: 'client.graphql.url' })}: {params.url}
      </p>
      <form>
        <textarea placeholder={intl.messages['placeholder.graphqlquery'] as string} />
        <button type="submit">{intl.formatMessage({ id: 'client.graphql.send' })}</button>
      </form>
    </>
  );
};

export default GraphiQLClient;
