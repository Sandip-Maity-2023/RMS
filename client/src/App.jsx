import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import ProtectedRoute from './components/ProtectionRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorRegister from './pages/VendorRegister';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/UserDashboard';
import SettingsPage from './pages/Settings';
import ProductCatalog from './pages/ProductCatalog';
import CartCheckout from './pages/CartCheckout';
import OrderReturn from './pages/OrderReturn';

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: user ? '20px' : '0' }}>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="/vendor-register" element={user ? <Navigate to="/dashboard" replace /> : <VendorRegister />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard shared across all authorized roles */}
        <Route element={<ProtectedRoute allowedRoles={['client', 'vendor', 'admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/checkout" element={<CartCheckout />} />
        </Route>

        {/* Vendor and Admin-only routes */}
        <Route element={<ProtectedRoute allowedRoles={['vendor', 'admin']} />}>
          <Route path="/reports" element={<div style={{ padding: '20px' }}>Reports & Analytics Page</div>} />
          <Route path="/returns" element={<OrderReturn />} />
        </Route>

        {/* Admin-only configuration routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Access Handlers */}
        <Route path="/unauthorized" element={<div style={{ padding: '40px', textAlign: 'center' }}><h2>403 - Access Denied</h2><p>You do not have permission to access this page.</p></div>} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
