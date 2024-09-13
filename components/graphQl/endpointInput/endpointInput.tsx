'use client';

import { ChangeEvent, memo } from 'react';
import { IntlProvider } from 'react-intl';

import { Input } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { setEndpoint, setSdlEndpoint } from '@/redux/slices/graphQlSlice';
import { getMessages } from '@/services/intl/wordbook';

export const EndpointInput = memo(
  ({
    locale,
    endpoint,
    sdlEndpoint,
  }: {
    locale: string;
    endpoint: string;
    sdlEndpoint: string;
  }) => {
    const messages = getMessages(locale);

    const dispatch = useAppDispatch();

    const changeEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setEndpoint(e.target.value));
    };

    const changeSdlEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
      if (!sdlEndpoint && e.target.value) {
        dispatch(setSdlEndpoint(`${e.target.value}?sdl`));
      }

      if (e.target.value === sdlEndpoint && e.target.value) {
        dispatch(setSdlEndpoint(`${e.target.value}?sdl`));
      }
    };

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Input
          type="text"
          value={endpoint}
          placeholder={messages['rest.placeholder.url']}
          onChange={changeEndpoint}
          onBlur={changeSdlEndpoint}
        />
      </IntlProvider>
    );
  },
  (prevProps, nextProps) =>
    prevProps.endpoint === nextProps.endpoint && prevProps.sdlEndpoint === nextProps.sdlEndpoint
);

EndpointInput.displayName = 'EndpointInput';
