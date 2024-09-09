'use client';

import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEndpoint, setSdlEndpoint } from '@/redux/slices/graphQlSlice';
import { Input } from '@/components';

export const EndpointInput = () => {
  const dispatch = useAppDispatch();
  const endpoint = useAppSelector((state) => state.graphQlSlice.endpoint);
  const sdlEndpoint = useAppSelector((state) => state.graphQlSlice.sdlEndpoint);

  const changeEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(e.target.value));
  };

  return (
    <Input
      type="text"
      value={endpoint}
      placeholder="Endpoint URL"
      onChange={changeEndpoint}
      onBlur={(e) => {
        if (!sdlEndpoint) {
          dispatch(setSdlEndpoint(`${e.target.value}?sdl`));
        }
      }}
    />
  );
};
