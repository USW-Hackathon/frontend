import { instance } from "./instance";

interface ICourse{
  majorId: number;
  grade: number;
}
export const getCourse = async ({majorId, grade}: ICourse) => {
  const response = await instance.get(`course?majorId=${majorId}&grade=${grade}`);
  return response;
};