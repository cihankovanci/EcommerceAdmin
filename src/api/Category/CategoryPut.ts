import {api} from '../api';
import {useMutation} from '@tanstack/react-query';

interface BodyParams {
  name: string;
  sortOrder: number;
  status: number;
  displayShowcaseContent: number;
  showcaseContentDisplayType: number;
  displayShowcaseFooterContent: number;
  showcaseFooterContentDisplayType: number;
  hasChildren: number;
  isCombine: number;
}

export async function CategoryPut(id: number, body: BodyParams) {
  return await api.call({
    url: `/categories/${id}`,
    method: 'PUT',
    body,
  });
}

export function useCategoryPut() {
  const categoryPut = useMutation({
    mutationFn: ({id, body}: {id: number; body: BodyParams}) => {
      return CategoryPut(id, body);
    },
  });
  return categoryPut;
}
