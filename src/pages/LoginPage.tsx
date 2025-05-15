import { useForm } from 'react-hook-form';
import useLogin from '@/hooks/useLogin';

type LoginForm = {
  memberId: string;
  password: string;
};

const LoginPage = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log('로그인 시도:', data);
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">이메일</label>
          <input
            {...register('memberId', { required: '이메일을 입력해주세요' })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.memberId && <p className="text-red-500 text-sm mt-1">{errors.memberId.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">비밀번호</label>
          <input
            type="password"
            {...register('password', { required: '비밀번호를 입력해주세요' })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
