import {api} from '../api';
import {useMutation} from '@tanstack/react-query';

interface Params {
  id: number;
}

export async function CategoryDelete(params: Params) {
  return await api.call({
    url: `/categories/${params.id}`,
    method: 'DELETE',
  });
}

export function useCategoryDelete() {
  const categoryDelete = useMutation({
    mutationFn: (params: Params) => {
      return CategoryDelete(params);
    },
  });
  return {categoryDelete};
}
