import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    productCategory: '',
    gstNo: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      
        const res = await apiRequest('/api/auth/register-vendor', {
          method: 'POST',
          body: JSON.stringify(formData)
        });

        setCoupon(res.couponCode);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
      {/* Coupon Display Box */}
      <div style={{ border: '1px solid #ffcc00', backgroundColor: '#fff8dc', padding: '15px', borderRadius: '10px', height: 'fit-content' }}>
        <h4>For new signup</h4>
        <div style={{ border: '1px solid #333', padding: '10px', backgroundColor: '#87cefa', textAlign: 'center', fontWeight: 'bold' }}>
          {coupon ? coupon : 'xxxx10'}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={logoBox}>Logo</div>
        <h3>Vendor Sign-up Page</h3>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}><label>First Name</label><input type="text" name="firstName" onChange={handleChange} required /></div>
          <div style={fieldStyle}><label>Last Name</label><input type="text" name="lastName" onChange={handleChange} required /></div>
          <div style={fieldStyle}><label>Company</label><input type="text" name="companyName" onChange={handleChange} required /></div>
          <div style={fieldStyle}>
            <label>Category</label>
            <select name="productCategory" onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Tools">Tools</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div style={fieldStyle}><label>GST No</label><input type="text" name="gstNo" onChange={handleChange} /></div>
          <div style={fieldStyle}><label>Email ID</label><input type="email" name="email" onChange={handleChange} required /></div>
          <div style={fieldStyle}><label>Password</label><input type="password" name="password" onChange={handleChange} required /></div>
          <div style={fieldStyle}><label>Confirm Password</label><input type="password" name="confirmPassword" onChange={handleChange} required /></div>
          <button type="submit" style={btnStyle}>Register</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/register" style={{ fontSize: '12px', color: 'blue' }}>Register as customer</Link>
        </div>
      </div>
    </div>
  );
};

const cardStyle = { border: '2px solid #000', borderRadius: '15px', padding: '20px', width: '300px' };
const logoBox = { border: '1px solid #000', borderRadius: '10px', height: '30px', textAlign: 'center', lineHeight: '30px', marginBottom: '15px' };
const fieldStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' };
const btnStyle = { backgroundColor: '#8a2be2', color: '#fff', border: 'none', borderRadius: '8px', width: '100%', padding: '8px', cursor: 'pointer' };

export default VendorRegister;
