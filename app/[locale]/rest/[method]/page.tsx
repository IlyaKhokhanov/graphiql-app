import { RestClient } from '@/containers';

const RestClientPage = ({ params }: { params: { method: string; locale: string } }) => {
  return <RestClient method={params.method} locale={params.locale} />;
};

export default RestClientPage;
