// api/notice.ts

import { instance } from './instance';

interface INotice {
  id?: number;
}
interface IAllNotice {
  page?: number;
  size?: number;
}
interface ICategoryNotice {
  page?: number;
  size?: number;
  category: number;
}

export const getNotice = async ({ id }: INotice) => {
  return await instance.get(`/notices/${id}`);
};

export const getAllNotice = async ({ page, size }: IAllNotice) => {
  return await instance.get(`/notices?page=${page}&size=${size}`);
};

export const getCategoryNotice = async ({ page, size, category }: ICategoryNotice) => {
  return await instance.get(`/notices/category/${category}?page=${page}&size=${size}`);
};
