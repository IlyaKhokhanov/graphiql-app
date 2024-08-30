import { RestClient } from '@/containers';

const RestClientPage = ({ params }: { params: { method: string; body?: string } }) => {
  return <RestClient method={params.method} />;
};

export default RestClientPage;
