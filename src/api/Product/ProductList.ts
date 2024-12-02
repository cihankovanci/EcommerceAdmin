import {api} from '../api';
import {useQuery} from '@tanstack/react-query';
import * as productTypes from '../../types/Product/Product.types';
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

  return {
    ProductList: query.data as productTypes.Product[] | undefined,
    ...query,
  };
}
