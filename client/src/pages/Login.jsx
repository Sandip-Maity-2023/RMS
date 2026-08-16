import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { loginId, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid User ID or Password.');
    }
  };

  return (
    <div style={cardStyle}>
      <div style={logoBox}>Logo</div>
      <h3>Login Page</h3>
      {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={fieldStyle}>
          <label>Login ID </label>
          <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
        </div>
        <div style={fieldStyle}>
          <label>Password </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={btnStyle}>Log In</button>
      </form>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '12px' }}>
        <Link to="/reset-password" style={{ display: 'block', marginBottom: '5px' }}>Forgot Password?</Link>
        <span>Do not have an account? </span>
        <Link to="/register" style={{ color: 'blue' }}>Register Here</Link>
      </div>
    </div>
  );
};

const cardStyle = { border: '2px solid #000', borderRadius: '15px', padding: '20px', width: '280px', margin: '30px auto' };
const logoBox = { border: '1px solid #000', borderRadius: '10px', height: '30px', textAlign: 'center', lineHeight: '30px', marginBottom: '15px' };
const fieldStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' };
const btnStyle = { backgroundColor: '#8a2be2', color: '#fff', border: 'none', borderRadius: '8px', width: '100%', padding: '8px', cursor: 'pointer' };

export default Login;