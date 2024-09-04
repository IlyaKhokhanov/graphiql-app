import { RestClient } from '@/containers';

const RestClientPage = ({
  params,
}: {
  params: { method: string; url: string; options: string; locale: string };
}) => <RestClient {...params} />;

export default RestClientPage;
