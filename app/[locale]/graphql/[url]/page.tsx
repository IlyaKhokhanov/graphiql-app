import { getIntl } from '@/services/intl/intl';
import { IRouteProps } from './page.props';
import { GraphiQLClient } from '@/containers';

const GraphiQLClientPage = ({ params }: IRouteProps) => {
  const intl = getIntl(params.locale);

  return (
    <>
      <h1>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>
      <GraphiQLClient />
    </>
  );
};

export default GraphiQLClientPage;
