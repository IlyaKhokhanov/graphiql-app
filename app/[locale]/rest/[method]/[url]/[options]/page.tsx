import { RestClient } from '@/containers';

const RestClientPage = ({
  params,
}: {
  params: { method: string; url: string; options: string; body?: string };
}) => {
  return <RestClient method={params.method} url={params.url} options={params.options} />;
};

export default RestClientPage;
