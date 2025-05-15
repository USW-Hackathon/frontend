import { instance } from './instance';

interface INotice {
  division?: string;
  major?: string;
}

export const getProfessor = async ({ division, major }: INotice) => {
  const response = await instance.get(`/professors?division=${division}&major=${major}`);
  return response;
};