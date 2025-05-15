import { deleteBoardPostId, getAllBoardPost, getBoardPostId, postBoardPost } from "@/api/boardPost";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


interface IGetAllBoardPost {
  page?: number;
  size?: number;
  categoryId?: number;
}

// interface IPostBoardPost {
//   title: string;
//   content: string;
//   writer: string;
//   parentId: number | null;
//   categoryId: number;
// }




export const useAllBoardPost = ({page, size, categoryId}:IGetAllBoardPost) => {
  return useQuery({
    queryKey: ['allBoardPost', page, size,categoryId],
    queryFn: ()=> getAllBoardPost({ page, size,categoryId}),
  });
};



export const useBoardPostId = ({id}: {id : number}) => {
  return useQuery({
    queryKey: ['boardPostId',id],
    queryFn: ()=> getBoardPostId({id}),
  });
};



export const usePostBoardPost = () => {
  const queryClient = useQueryClient(); // 기존 인스턴스 사용
  return useMutation({
    mutationFn: postBoardPost, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allBoardPost'] });
    },
    onError: () => {
      console.error('게시글 작성 실패');
      alert('게시글 작성 실패');
    },
  });
};


export const useDeleteBoardPost = () => {
  const queryClient = useQueryClient(); // 기존 인스턴스 사용
  return useMutation({
    mutationFn: deleteBoardPostId, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['allBoardPost']});
    },
    onError: () => {
      console.error('게시글 삭제 실패');
      alert('게시글 삭제 실패');
    },
  });
};