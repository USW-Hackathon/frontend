import { getProfessor } from "@/api/professor";
import { useQuery } from "@tanstack/react-query";

interface INotice {
  division?: string;
  major?: string;
}

export const useProfessor = ({ division, major }: INotice) => {
  return useQuery({
    queryKey: ['professors', division, major],
    queryFn: ()=> getProfessor({division, major}),
  });
};