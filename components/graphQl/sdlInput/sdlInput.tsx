'use client';

import { ChangeEvent, useState } from 'react';

import { Input } from '../../input/input';

export const SdlInput = () => {
  const [value, setValue] = useState<string>('');

  const changeSdlEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Input type="text" value={value} placeholder="SDL URL" onChange={changeSdlEndpoint} />;
};
