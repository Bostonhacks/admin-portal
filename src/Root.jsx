import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import React from 'react';
import { auth, logout } from './firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './pages/Login';

const Root = () => {
  const [user, loading] = useAuthState(auth);

  const valid_emails = [
    'dfc@bu.edu',
    'dxu0117@bu.edu',
    'dlaboy@bu.edu',
    'declanyg@bu.edu',
    'simran27@bu.edu',
    'danyu@bu.edu',
    'minpark@bu.edu',
    'jamesw03@bu.edu',
    'kbbtan@bu.edu',
    'rongc@bu.edu',
    'eschoi@bu.edu',
    'jaketlee@bu.edu',
    'yangi@bu.edu',
  ];

  return (
    <>
      {!user ? (
        <Login />
      ) : valid_emails.includes(user.email) ? (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </>
      ) : (
        <div>
          <h1>INVALID USER</h1>
          <button
            onClick={() => {
              logout();
            }}
          >
            LOGOUT
          </button>
        </div>
      )}
    </>
  );
};

export default Root;
