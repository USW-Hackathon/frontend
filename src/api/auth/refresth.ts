import { getCookie } from '@/utils/cookies';
import axios from 'axios';

export const updateRefresh = async () => {
  const token = getCookie('token');
  const response = await axios.post(`auth/reissue`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return response;
};