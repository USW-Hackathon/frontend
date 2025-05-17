import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth/login';

interface UseLoginParams {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const useLogin = ({ onSuccess, onError }: UseLoginParams = {}) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('로그인 성공:', data.userName);
      onSuccess?.(data); // 외부 콜백 호출
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      onError?.(error); // 외부 콜백 호출
    },
  });
};

export default useLogin;
