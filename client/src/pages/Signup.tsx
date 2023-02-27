import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupFormValues, signup } from '@client/apis';
import { useCurrentUser } from '../context/currentUserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type SignupPageFormValues = SignupFormValues & {
  confirmPassword: string;
};

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

export function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPageFormValues>({
    resolver: yupResolver(schema),
  });
  const { setUser } = useCurrentUser();
  const navigate = useNavigate();
  const [error, setError] = useState({ message: '' });

  const onSubmit = async (data: SignupPageFormValues) => {
    try {
      const responseData: { token: string; user: { username: string } } = await signup(data);
      sessionStorage.setItem('token', responseData.token);
      setUser({ username: responseData.user.username, isLoggedin: true });
      navigate('/');
    } catch (err: any) {
      setError({ message: err.message });
    }
  };

  return (
    <div className='text-center'>
      <div className='text-4xl text-center mb-14'>Sign Up</div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex flex-col h-20'>
          <input
            type='text'
            {...register('username')}
            placeholder='Username'
            className='border p-2 mb-1 focus-visible:outline-blue-600'
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-col h-20'>
          <input
            type='email'
            {...register('email')}
            placeholder='Email'
            className='border p-2 mb-1 focus-visible:outline-blue-600'
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-col h-20'>
          <input
            type='password'
            {...register('password')}
            placeholder='Password'
            className='border p-2 mb-1 focus-visible:outline-blue-600'
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <div className='flex flex-col h-20'>
          <input
            type='password'
            {...register('confirmPassword')}
            placeholder='Confirm Password'
            className='border p-2 mb-1 focus-visible:outline-blue-600'
          />
          {errors.confirmPassword && (
            <p className='text-red-500'>{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded mb-2'>
          Register
        </button>
        <div>
          If you already have an account, please redirect &nbsp;
          <a href='/login' className='underline text-blue-600'>
            login
          </a>
          &nbsp; page.
        </div>
      </form>
      {error && <span className='text-red-500'>{error.message}</span>}
    </div>
  );
}
