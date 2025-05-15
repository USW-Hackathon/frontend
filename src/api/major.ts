import { instance } from "./instance";

export const getMajor = async ({id}: {id :number}) => {
  const response = await instance.get(`/major/${id}`);
  return response;
};