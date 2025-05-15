
import { getCourse } from "@/api/course";
import { useQuery } from "@tanstack/react-query";

interface ICourse{
  majorId: number;
  grade: number;
}


export const useCourse = ({majorId, grade}: ICourse) => {
  return useQuery({
    queryKey: ['course', majorId, grade],
    queryFn: ()=> getCourse({majorId, grade}),
  });
};

