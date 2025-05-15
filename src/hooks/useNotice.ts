import { useQuery } from '@tanstack/react-query';
import { getAllNotice, getCategoryNotice, getNotice } from '@/api/notice';


interface IAllNotice {
  page?: number;
  size?: number;
}

interface ICategoryNotice {
  page?: number;
  size?: number;
  category?: string;
}



export const useNotice = (id: number) => {
  return useQuery({
    queryKey: ['notices', id],
    queryFn: () => getNotice({ id }),
    enabled: !!id, 
  });
};

export const useAllNotices = ({page, size} : IAllNotice) => {
  return useQuery({
    queryKey: ['allNotices', page, size],
    queryFn: ()=> getAllNotice({page, size}),
  });
};


export const useCategoryNotices = ({page, size, category} : ICategoryNotice) => {
  return useQuery({
    queryKey: ['categoryNotices', page, size, category],
    queryFn: ()=> getCategoryNotice({page, size,category}),
  });
};