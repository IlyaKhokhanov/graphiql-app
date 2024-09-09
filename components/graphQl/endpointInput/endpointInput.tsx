'use client';

import { ChangeEvent, useState } from 'react';

import { Input } from '@/components';

export const EndpointInput = () => {
  const [value, setValue] = useState<string>('');

  const changeEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Input type="text" value={value} placeholder="Endpoint URL" onChange={changeEndpoint} />;
};
