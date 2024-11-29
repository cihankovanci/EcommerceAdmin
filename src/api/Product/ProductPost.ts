import {api} from '../api';
import {useMutation} from '@tanstack/react-query';

interface Params {
  name: string;
  sku: string;
  stockAmount: number;
  price1: number;
  currency: {
    id: number;
    property1: string[];
    property2: string[];
  };
  discountType: number;
  taxIncluded: number;
  stockTypeLabel: string;
  customShippingDisabled: number;
  status: number;
  hasOption: number;
  categoryShowcaseStatus: number;
}

export async function ProductPost(params: Params) {
  return await api.call({
    url: '/products',
    method: 'POST',
    body: params,
  });
}

export function useProductPost() {
  const productPost = useMutation({
    mutationFn: (params: Params) => {
      return ProductPost(params);
    },
  });
  return productPost;
}
