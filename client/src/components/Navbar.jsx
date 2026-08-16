import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '12px 24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <strong style={{ fontSize: '18px' }}>Rental Hub</strong>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Orders</Link>
        <Link to="/products" style={{ textDecoration: 'none', color: '#555' }}>Products</Link>
        
        {/* Reports & Settings restricted from standard Portal Users */}
        {(user?.role === 'admin' || user?.role === 'vendor') && (
          <Link to="/reports" style={{ textDecoration: 'none', color: '#555' }}>Reports</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/settings" style={{ textDecoration: 'none', color: '#555' }}>Settings</Link>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setProfileOpen(!profileOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer' }}
        >
          <span>{user ? `${user.name} (${user.role.toUpperCase()})` : 'Guest'}</span>
          <span style={{ fontSize: '12px' }}>▼</span>
        </button>
        {profileOpen && (
          <div style={{ position: 'absolute', right: 0, marginTop: '8px', width: '140px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10 }}>
            <Link to="/profile" style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: '#333', borderBottom: '1px solid #eee' }}>Profile</Link>
            <div onClick={handleLogout} style={{ padding: '8px 12px', cursor: 'pointer', color: 'red' }}>Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
