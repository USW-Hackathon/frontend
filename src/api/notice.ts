import { instance } from './instance';

interface INotice {
  id?:number
}
interface IAllNotice {
  page?: number;
  size?: number;
}


interface ICategoryNotice {
  page?: number;
  size?: number;
  category?: string;
}
export const getNotice = async ({ id }: INotice) => {
  const response = await instance.get(`/notices/${id}`);
  return response;
};


export const getAllNotice = async ({page, size} : IAllNotice) => {
  const response = await instance.get(`/notices?page=${page}&size=${size}`);
  return response;
};


export const getCategoryNotice = async ({page, size, category} : ICategoryNotice) => {
  const response = await instance.get(`/notices?category=${category}&page=${page}&size=${size}`);
  return response;
};