import { RestClient } from '@/containers';

const RestClientPage = ({
  params,
}: {
  params: { method: string; url: string; options: string; locale: string };
}) => {
  return (
    <RestClient
      method={params.method}
      url={params.url}
      options={params.options}
      locale={params.locale}
    />
  );
};

export default RestClientPage;
