import { instance } from '../instance';
import { setCookie } from '@/utils/cookies';

interface IMember {
  memberId: string;
  password: string;
}

export const updateRefresh = async ({ memberId, password }: IMember) => {
  const response = await instance.post(`/members/login`, {
    memberId,
    password,
  });


  const AccessToken = response.headers['authorization']; // Bearer 토큰


  if (AccessToken) {
    // 'Bearer'를 제외한 토큰만 추출
    const token = AccessToken.split(' ')[1]; // 공백 기준으로 나눠 두 번째 요소 사용
    setCookie('token', token, { path: '/', secure: true });
  }
  // if (refreshToken) {
  //   setCookie('refresh', refreshToken, { path: '/', secure: true });
  // }

  return response;
};