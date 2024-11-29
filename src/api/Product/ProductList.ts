import {api} from '../api';
import {useQuery} from '@tanstack/react-query';

export async function ProductList() {
  return await api.call({
    url: '/products',
    method: 'GET',
  });
}

export function useProductList() {
  const query = useQuery({
    queryFn: () => ProductList(),
    queryKey: ['products'],
  });

  return {ProductList: query.data, ...query};
}
