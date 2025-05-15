import { instance } from "./instance";

export const getCollege = async ({collegeId}: {collegeId : number}) => {
  const response = await instance.get(`/college/${collegeId}`);
  return response;
};