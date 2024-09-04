import { RestClient } from '@/containers';

const RestClientPage = ({ params }: { params: { method: string; locale: string } }) => (
  <RestClient {...params} />
);

export default RestClientPage;
