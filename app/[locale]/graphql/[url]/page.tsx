import { getIntl } from '@/services/intl/intl';
import { IRouteProps } from './page.props';
import { GraphiQLClient } from '@/containers';

const GraphiQLClientPage = ({ params }: IRouteProps) => {
  const intl = getIntl(params.locale);

  return (
    <>
      <h1>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>
      <p>
        {intl.formatMessage({ id: 'client.graphql.url' })}: {params.url}
      </p>
      {/* <form>
        <textarea placeholder={intl.messages['placeholder.graphqlquery'] as string} />
        <button type="submit">{intl.formatMessage({ id: 'client.graphql.send' })}</button>
      </form> */}
      <GraphiQLClient />
    </>
  );
};

export default GraphiQLClientPage;
