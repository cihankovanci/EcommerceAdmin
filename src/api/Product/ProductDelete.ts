import {api} from '../api';
import {useMutation} from '@tanstack/react-query';

interface Params {
  id: number;
}

export async function ProductDelete(params: Params) {
  return await api.call({
    url: `/products/${params.id}`,
    method: 'DELETE',
  });
}

export function useProductDelete() {
  const productDelete = useMutation({
    mutationFn: (params: Params) => {
      return ProductDelete(params);
    },
  });
  return productDelete;
}
