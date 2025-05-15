import { useMutation } from '@tanstack/react-query';
import { updateRefresh } from '@/api/auth/login';

const useLogin = () => {
  return useMutation({
    mutationFn: updateRefresh, 
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      window.location.href = '/';
    
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('아이디 혹은 비밀번호가 잘못되었습니다.');
    },
  });
};

export default useLogin;