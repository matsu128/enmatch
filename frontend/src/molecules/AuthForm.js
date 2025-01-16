import React from 'react';
import InputField from '../atoms/InputField';

const AuthForm = ({ email, password, onEmailChange, onPasswordChange, errors }) => (
  <>
    <div className='mb-3'>
      <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
        メールアドレス
      </label>
      <InputField
        id='email'
        type='email'
        placeholder='enmatch@example.com'
        value={email}
        onChange={onEmailChange}
        className={`block w-full rounded-md border ${
          errors?.email
            ? 'border-red-500 focus:outline-none focus:ring-red-500 focus:ring-1'
            : 'border-gray-300 focus:outline-none focus:ring-yellow-400 focus:ring-1'
        } px-4 py-2 text-gray-900 shadow-sm sm:text-sm`}
      />
      {errors?.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}
    </div>
    <div className='mb-3'>
      <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
        パスワード
      </label>
      <InputField
        id='password'
        type='password'
        placeholder='********'
        value={password}
        onChange={onPasswordChange}
        className={`block w-full rounded-md border ${
          errors?.password
            ? 'border-red-500 focus:outline-none focus:ring-red-500 focus:ring-1'
            : 'border-gray-300 focus:outline-none focus:ring-yellow-400 focus:ring-1'
        } px-4 py-2 text-gray-900 shadow-sm sm:text-sm`}
      />
      {errors?.password && <p className='mt-1 text-sm text-red-500'>{errors.password}</p>}
    </div>
  </>
);

export default AuthForm;
