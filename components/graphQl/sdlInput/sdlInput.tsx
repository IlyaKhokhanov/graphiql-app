import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSdlEndpoint } from '@/redux/slices/graphQlSlice';
import { ChangeEvent } from 'react';
import { Input } from '../../input/input';

export const SdlInput = () => {
  const dispatch = useAppDispatch();
  const sdlEndpoint = useAppSelector((state) => state.graphQlSlice.sdlEndpoint);

  const changeSdlEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSdlEndpoint(e.target.value));
  };

  return (
    <Input type="text" value={sdlEndpoint} placeholder="SDL URL" onChange={changeSdlEndpoint} />
  );
};
