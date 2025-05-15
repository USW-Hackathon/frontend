import { instance } from './instance';

interface IGetAllBoardPost {
  page?: number;
  size?: number;
  categoryId?: number;
}

interface IPostBoardPost {
  title: string;
  content: string;
  writer: string;
  parentId: number | null;
  categoryId: number;
}




export const getAllBoardPost = async ({page, size, categoryId}:IGetAllBoardPost) => {
  const response = await instance.get(`/board-posts?page=${page}&size=${size}&categoryId=${categoryId}`);
  return response;
};



export const postBoardPost = async (data: IPostBoardPost) => {
  const response = await instance.post(`/board-posts`, data);
  return response;
};



export const getBoardPostId = async ({id}: {id : number}) => {
  const response = await instance.get(`/board-posts/${id}`);
  return response;
};



export const deleteBoardPostId = async ({id}: {id : number}) => {
  const response = await instance.delete(`/board-posts/${id}`);
  return response;
};

