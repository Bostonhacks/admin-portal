import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from '../components/common/GoogleIcon.svg';

// Login page
export default function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Add or edit this to all valid emails
  const valid_emails = ["jamesw03@bu.edu"];
  
  useEffect(() => {
    if (loading) return;
    if (user) {
      // Check if the user is a valid admin
      if (valid_emails.includes(user.email)) {
        navigate("/stats");
      } else {
        auth.signOut();
        navigate("/invalid");
      }
    }

  }, [user, loading, navigate]);

  return (
    <div style={{textAlign: "center"}}>
      <button onClick={signInWithGoogle}>
        <img src={GoogleIcon} alt="Google Icon" style={{ width: "100px" }}/>Login with Google
      </button>
    </div>
  );
}