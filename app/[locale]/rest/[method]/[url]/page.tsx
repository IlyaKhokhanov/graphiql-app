import { getIntl } from '@/services/intl/intl';
import { IRouteProps } from './page.props';

const RestClient = async ({ params }: IRouteProps) => {
  const intl = await getIntl(params.locale);

  return (
    <>
      <h1>{intl.formatMessage({ id: 'client.rest.head' })}</h1>
      <p>
        {intl.formatMessage({ id: 'client.rest.method' })}: {params.method}
      </p>
      <p>
        {intl.formatMessage({ id: 'client.rest.url' })}: {params.url}
      </p>
      <form>
        <textarea placeholder={intl.messages['placeholder.requestbody'] as string} />
        <button type="submit">{intl.formatMessage({ id: 'client.rest.send' })}</button>
      </form>
    </>
  );
};

export default RestClient;
