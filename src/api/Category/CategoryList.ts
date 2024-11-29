import {api} from '../api';
import {useQuery} from '@tanstack/react-query';

export async function CategoryList() {
  return await api.call({
    url: '/categories',
    method: 'GET',
  });
}

export function useCategoryList() {
  const query = useQuery({
    queryFn: () => CategoryList(),
    queryKey: ['categories'],
  });

  return {CategoryList: query.data, ...query};
}
