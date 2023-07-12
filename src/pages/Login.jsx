import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from '../components/common/GoogleIcon.svg';

// Login page
export default function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user) navigate("/application");

  }, [user, loading, navigate]);

  return (
    <div style={{textAlign: "center"}}>
      <button onClick={signInWithGoogle}>
        <img src={GoogleIcon} alt="Google Icon" />Login with Google
      </button>

    </div>
  );
}