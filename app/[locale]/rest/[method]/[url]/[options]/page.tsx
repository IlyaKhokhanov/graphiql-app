import { RestClient } from '@/containers';
import { getIntl } from '@/services/intl/intl';

const RestClientPage = async ({
  params,
}: {
  params: { method: string; url: string; options: string; locale: string };
}) => {
  const { messages } = await getIntl(params.locale);

  return (
    <RestClient
      method={params.method}
      url={params.url}
      options={params.options}
      locale={params.locale}
      messages={messages}
    />
  );
};

export default RestClientPage;
