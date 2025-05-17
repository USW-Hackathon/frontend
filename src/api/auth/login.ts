import { instance } from '../instance';
import { setCookie } from '@/utils/cookies';

interface IMember {
  memberId: string;
  password: string;
}


export const login = async ({ memberId, password }: IMember) => {
  const response = await instance.post(`/members/login`, {
    memberId,
    password,
  });

  const AccessToken = response.headers['authorization']; // Bearer 토큰
  const data = response.data;

  if (AccessToken) {
    const token = AccessToken.split(' ')[1];
    setCookie('token', token, { path: '/', secure: true });
  }
  
  const username = data.userName || null;
  if (username) {
    setCookie('username', username,  { path: '/', secure: true });
  }
  return data;
};