import { useAllBoardPost, useBoardPostId, useDeleteBoardPost, usePostBoardPost } from '@/hooks/useBoardPost';
import { useCollege } from '@/hooks/useCollege';
import { useCourse } from '@/hooks/useCourse';
import { useMajor } from '@/hooks/useMajor';
import { useAllNotices, useCategoryNotices, useNotice } from '@/hooks/useNotice';
import { useProfessor } from '@/hooks/useProfessor';

const ApiTestPage = () => {
  const { data: NoticeData } = useNotice(1);
  const { data: AllNoticeData } = useAllNotices({ page: 1, size: 10 });
  const { data: CategoryNoticeData } = useCategoryNotices({ page: 1, size: 10 });
  const { data: AllBoardBpostData } = useAllBoardPost({ page: 1, size: 10, categoryId: 1 });
  const { data: BoardBpostIdData } = useBoardPostId({ id: 2 });
  const { data: CollegeData } = useCollege({ collegeId: 1 });
  const { data: CourseData } = useCourse({ majorId: 1, grade: 1 });
  const { data: MajorData } = useMajor({ id: 1 });
  const { data: ProfessorData } = useProfessor({ division: '1', major: '1' });
  const { mutate: postBoardPostMutate } = usePostBoardPost();
  const { mutate: deleteBoardPostMutate } = useDeleteBoardPost();

  const handleDelete = ({ id }: { id: number }) => {
    deleteBoardPostMutate({ id: id });
  };

  console.log('NoticeData:', NoticeData?.data);
  console.log('AllNoticeData:', AllNoticeData?.data);
  console.log('CategoryNoticeData:', CategoryNoticeData?.data);
  console.log('AllBoardBpostData:', AllBoardBpostData?.data);
  console.log('BoardBpostIdData:', BoardBpostIdData?.data);
  console.log('CollegeData:', CollegeData?.data);
  console.log('CourseData:', CourseData?.data);
  console.log('MajorData:', MajorData?.data);
  console.log('ProfessorData:', ProfessorData?.data);

  return (
    <div>
      {/*  */}
      {/* 게시물 추가 및 삭제 post 요청테스트에 대한 내용 */}
      {/*  */}
      <p className="text-2xl text-blue-500 mb-5"> api post/delete request test</p>
      <div className="mb-4">
        <input type="text" placeholder="게시물 제목" className="border px-2 py-1 mr-2" id="postTitle" />
        <input type="text" placeholder="게시물 내용" className="border px-2 py-1 mr-2" id="postContent" />
        <input type="text" placeholder="작성자" className="border px-2 py-1 mr-2" id="postWriter" />
        <button
          onClick={() => {
            const title = (document.getElementById('postTitle') as HTMLInputElement).value;
            const content = (document.getElementById('postContent') as HTMLInputElement).value;
            const writer = (document.getElementById('postWriter') as HTMLInputElement).value;
            postBoardPostMutate({
              title,
              content,
              writer,
              parentId: null,
              categoryId: 1,
            });
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          게시물 추가
        </button>
      </div>
      <div className="mb-4">
        <input type="number" placeholder="삭제할 게시물 ID" className="border px-2 py-1 mr-2" id="deletePostId" />
        <button
          onClick={() => {
            const id = parseInt((document.getElementById('deletePostId') as HTMLInputElement).value, 10);
            handleDelete({ id });
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          게시물 삭제
        </button>
      </div>

      {/*  */}
      {/* 기본 get 요청에 대한 내용 */}
      {/*  */}

      <p className="text-2xl text-blue-500 mb-5"> api get request test</p>
      <div>
        <h3 className="text-red-500">All Board Post Data:</h3>
        <pre>{JSON.stringify(AllBoardBpostData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">Board Post ID Data:</h3>
        <pre>{JSON.stringify(BoardBpostIdData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">Notice Data:</h3>
        <pre>{JSON.stringify(NoticeData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">All Notice Data:</h3>
        <pre>{JSON.stringify(AllNoticeData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">Category Notice Data:</h3>
        <pre>{JSON.stringify(CategoryNoticeData?.data, null, 2)}</pre>
      </div>

      <div>
        <h3 className="text-red-500">College Data:</h3>
        <pre>{JSON.stringify(CollegeData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">Course Data:</h3>
        <pre>{JSON.stringify(CourseData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">Major Data:</h3>
        <pre>{JSON.stringify(MajorData?.data, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-red-500">Professor Data:</h3>
        <pre>{JSON.stringify(ProfessorData?.data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ApiTestPage;
