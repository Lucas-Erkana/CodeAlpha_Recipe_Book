import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { signUp } from '../../services/api';

function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await signUp({ email, password });
      dispatch(setUser(response.data.user));
      // Redirect to a different page upon successful sign-up
      // You can use react-router-dom's useHistory for this
    } catch (error) {
      // Handle sign-up error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;
