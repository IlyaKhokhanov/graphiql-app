'use client';

import { ChangeEvent } from 'react';

import { Input } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { setEndpoint, setSdlEndpoint } from '@/redux/slices/graphQlSlice';

export const EndpointInput = ({
  endpoint,
  sdlEndpoint,
}: {
  endpoint: string;
  sdlEndpoint: string;
}) => {
  const dispatch = useAppDispatch();

  const changeEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(e.target.value));
  };

  const changeSdlEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    if (!sdlEndpoint && e.target.value) {
      dispatch(setSdlEndpoint(`${e.target.value}?sdl`));
    }
  };

  return (
    <Input
      type="text"
      value={endpoint}
      placeholder="Endpoint URL"
      onChange={changeEndpoint}
      onBlur={changeSdlEndpoint}
    />
  );
};
