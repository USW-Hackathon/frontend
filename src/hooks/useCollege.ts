
import { getCollege } from "@/api/college";
import { useQuery } from "@tanstack/react-query";


export const useCollege = ({collegeId}: {collegeId : number}) => {
  return useQuery({
    queryKey: ['college', collegeId],
    queryFn: ()=> getCollege({collegeId}),
  });
};

