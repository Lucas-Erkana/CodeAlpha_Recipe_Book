import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { signIn } from '../../services/api';

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await signIn({ email, password });
      dispatch(setUser(response.data.user));
      // Redirect to a different page upon successful sign-in
      // You can use react-router-dom's useHistory for this
    } catch (error) {
      // Handle sign-in error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}

export default SignIn;
