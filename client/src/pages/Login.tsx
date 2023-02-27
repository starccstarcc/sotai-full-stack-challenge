import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginFormValues, login } from '@client/apis';
import { useCurrentUser } from '../context/currentUserContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { setUser } = useCurrentUser();
  const [error, setError] = useState({ message: '' });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const responseData = await login(data);
      sessionStorage.setItem('token', responseData.token);
      setUser({ username: data.username, isLoggedin: true });
      navigate('/');
    } catch (err: any) {
      setError({ message: err.message });
    }
  };

  return (
    <div className='text-center'>
      <div className='text-4xl text-center mb-14'>Login</div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex flex-col h-20'>
          <input
            type='text'
            {...register('username')}
            placeholder='Username'
            className='border p-2 mb-1 focus-visible:outline-blue-600'
          />
          {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
        </div>
        <div className='flex flex-col h-20'>
          <input
            type='password'
            {...register('password')}
            placeholder='Password'
            className='border p-2 mb-1 focus-visible:outline-blue-600'
          />
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </div>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded mb-2'>
          Login
        </button>
        <div>
          If you don't have any account, please redirect &nbsp;
          <a href='/signup' className='underline text-blue-600'>
            sign up
          </a>
          &nbsp; page.
        </div>
      </form>
      {error && <span className='text-red-500'>{error.message}</span>}
    </div>
  );
}
