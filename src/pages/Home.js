import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [logout, setLogout] = useState(false);

  const cookie = new Cookies();

  const testAPI = () => {
    if (!cookie.get('sessionToken')) {
      setMessage('You need to login first!');
      setError(true);
      setSuccess(false);
      setLogout(false);
    } else {
      Axios.post(
        'http://localhost:3001/test',
        {},
        { headers: { sessiontoken: cookie.get('sessionToken').session_token } }
      )
        .then(resp => {
          setMessage(resp.data);
          setSuccess(true);
          setError(false);
          setLogout(true);
        })
        .catch(err => {
          setMessage('The user is NOT authenticated!');
          setError(true);
          setSuccess(false);
          setLogout(false);
        });
    }
  };

  const logoutButton = () => {
    cookie.remove('sessionToken');
    setMessage('The cookie has been deleted!');
    setLogout(false);
  };
  return (
    <div className="flex flex-col items-center justify-center content-center text-center">
      <div className="flex flex-row space-x-5">
        <button
          className="mt-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={testAPI}
        >
          Test API
        </button>
        {logout ? (
          <button
            className="mt-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={logoutButton}
          >
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
      <div className="mt-5">
        {error ? <ErrorAlert message={message} /> : ''}
        {success ? <SuccessAlert message={message} /> : ''}
      </div>
    </div>
  );
}

export default Home;
