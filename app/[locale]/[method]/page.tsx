import { notFound } from 'next/navigation';

import { methods } from '@/constants';
import { RestClient } from '@/containers';

const RestClientPage = ({ params }: { params: { method: string; locale: string } }) => {
  if (!methods.includes(params.method.toUpperCase())) notFound();

  return <RestClient {...params} />;
};

export default RestClientPage;
