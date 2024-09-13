'use client';

import { ChangeEvent, memo } from 'react';

import { Input } from '../../input/input';
import { useAppDispatch } from '@/redux/hooks';
import { setSdlEndpoint } from '@/redux/slices/graphQlSlice';

export const SdlInput = memo(
  ({ sdlEndpoint, endpoint }: { sdlEndpoint: string; endpoint: string }) => {
    const dispatch = useAppDispatch();

    const changeSdlEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
      const cleanedEndpoint = e.target.value.replace(/\?sdl$/, '');
      dispatch(setSdlEndpoint(cleanedEndpoint));
    };

    return (
      <Input
        type="text"
        value={sdlEndpoint}
        placeholder="SDL URL"
        onChange={changeSdlEndpoint}
        onBlur={() => {
          if (!sdlEndpoint.endsWith('?sdl') && sdlEndpoint !== '' && sdlEndpoint === endpoint) {
            dispatch(setSdlEndpoint(`${sdlEndpoint}?sdl`));
          }
        }}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.sdlEndpoint === nextProps.sdlEndpoint && prevProps.endpoint === nextProps.endpoint
);

SdlInput.displayName = 'SdlInput';
