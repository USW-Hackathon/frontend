
import { getMajor } from "@/api/major";
import { useQuery } from "@tanstack/react-query";


export const useMajor = ({id}: {id :number}) => {
  return useQuery({
    queryKey: ['major', id],
    queryFn: ()=> getMajor({id}),
  });
};

