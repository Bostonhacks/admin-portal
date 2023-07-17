import React from 'react';
import { signInWithGoogle } from '../firebase/firebase-config';
import GoogleIcon from '../components/common/GoogleIcon.svg';

// Login page
export default function Login() {
  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={signInWithGoogle}>
        <img src={GoogleIcon} alt="Google Icon" style={{ width: '100px' }} />
        Login with Google
      </button>
    </div>
  );
}
