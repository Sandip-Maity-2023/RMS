import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      //const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email });
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, { email });
      
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Email not found.');
    }
  };

  return (
    <div style={cardStyle}>
      <h3>Reset Password</h3>
      {message && <p style={{ color: 'blue', fontSize: '13px' }}>{message}</p>}
      {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Enter Email ID: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={noteBox}>
          Note: The system should verify whether the entered email exists.
        </div>
        <button type="submit" style={btnStyle}>Submit</button>
      </form>
    </div>
  );
};

const cardStyle = { border: '2px solid #000', borderRadius: '15px', padding: '20px', width: '300px', margin: '50px auto' };
const noteBox = { border: '1px dashed orange', borderRadius: '8px', padding: '8px', fontSize: '11px', marginBottom: '15px' };
const btnStyle = { backgroundColor: '#8a2be2', color: '#fff', border: 'none', borderRadius: '8px', width: '100%', padding: '8px', cursor: 'pointer' };

export default ResetPassword;
