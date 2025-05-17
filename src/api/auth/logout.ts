import { instance } from '../instance';
import { getCookie, removeCookie } from '@/utils/cookies';

export const logout = async () => {
  const token = getCookie('token');
  if (!token) return;

  try {
    await instance.post(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 쿠키 삭제
    removeCookie('token', { path: '/' });
    removeCookie('username', { path: '/' }); 
  } catch (error) {
    console.error('Logout 실패:', error);
  }
};
