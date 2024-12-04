import {api} from '../api';
import {useMutation} from '@tanstack/react-query';

interface Params {
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

export async function CategoryPost(params: Params) {
  return await api.call({
    url: '/categories',
    method: 'POST',
    body: params,
  });
}

export function useCategoryPost() {
  const categoryPost = useMutation({
    mutationFn: (params: Params) => {
      return CategoryPost(params);
    },
  });
  return {categoryPost};
}
