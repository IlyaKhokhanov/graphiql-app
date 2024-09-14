import { notFound } from 'next/navigation';

import { methods } from '@/constants';
import { RestClient } from '@/containers';
import { GraphiQLClient } from '@/containers';

const RestClientPage = ({
  params,
}: {
  params: { method: string; url: string; options: string; locale: string };
}) => {
  if (methods.includes(params.method.toUpperCase())) return <RestClient {...params} />;
  if (params.method.toUpperCase() === 'GRAPHQL') return <GraphiQLClient {...params} />;
  notFound();
};

export default RestClientPage;
