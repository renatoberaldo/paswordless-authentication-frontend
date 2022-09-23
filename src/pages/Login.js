import React, { useState } from 'react';
import Axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = () => {
    if (!email) {
      setMessage('You should insert the email!');
      setSuccess(false);
      setError(true);
    } else {
      Axios.post('http://localhost:3001/login', { email })
        .then(resp => {
          setMessage(resp.data);
          setSuccess(true);
          setError(false);
          setEmail('');
        })
        .catch(err => {
          setMessage(err.message);
          setError(true);
          setSuccess(false);
        });
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            PasswordLess Login!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            by{' '}
            <a
              href="https://github.com/renatoberaldo"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Renato Beraldo Nunes
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error ? <ErrorAlert message={message} /> : ''}
            {success ? <SuccessAlert message={message} /> : ''}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
