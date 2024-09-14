'use client';

import { ClientsHeaders } from '@/components';
import { HeaderType } from './headersEditor.props';
import { useAppDispatch } from '@/redux/hooks';
import { addHeader, changeHeader, deleteHeader } from '@/redux/slices/graphQlSlice';
import { uid } from '@/utils';

export const HeadersEditor = ({ headers, locale }: { headers: HeaderType[]; locale: string }) => {
  const dispatch = useAppDispatch();

  const handleAddHeader = () => {
    dispatch(addHeader({ id: uid(), key: '', value: '' }));
  };

  const handleDeleteHeader = (id: string) => {
    dispatch(deleteHeader(id));
  };

  const handleChangeHeader = (value: string, id: string, field: string) => {
    dispatch(changeHeader({ value, id, field }));
  };

  return (
    <ClientsHeaders
      locale={locale}
      list={headers}
      addInput={handleAddHeader}
      changeInput={handleChangeHeader}
      deleteInput={handleDeleteHeader}
    />
  );
};
