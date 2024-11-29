import {api} from '../api';
import {useQuery} from '@tanstack/react-query';

interface Params {
  id: number;
}

export async function CategoryGet(params: Params) {
  return await api.call({
    url: `/categories/${params.id}`,
    method: 'GET',
  });
}

export function useCategoryGet(params: Params) {
  const query = useQuery({
    queryFn: () => CategoryGet(params),
    queryKey: ['categories'],
  });

  return {CategoryGet: query.data, ...query};
}
