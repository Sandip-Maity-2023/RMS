import React, { useState, useEffect } from 'react';

const mockOrders = [
  { id: 'S00001', customer: 'Wood Corner', product: 'TV', status: 'Reserved', pickupDate: 'Jul 6, 6:30pm', returnDate: 'Jul 10, 6:30pm', total: 1520, invoiceStatus: 'Invoiced' },
  { id: 'S00005', customer: 'Smith', product: 'Projector', status: 'Picked Up', pickupDate: 'Jul 10, 6:30pm', returnDate: 'Jul 10, 8:30pm', total: 1520, invoiceStatus: 'Confirmed' },
  { id: 'S00010', customer: 'John', product: 'Printer', status: 'Late Pickup', pickupDate: 'Jul 6, 6:30pm', returnDate: 'Jul 10, 6:30pm', total: 1520, invoiceStatus: 'Invoiced' },
  { id: 'S00012', customer: 'Alex', product: 'Car', status: 'Quotation', pickupDate: 'Jul 3, 9:00pm', returnDate: 'Jul 11, 9:00am', total: 1520, invoiceStatus: 'Quotation Sent' },
  { id: 'S00020', customer: 'Sam', product: 'Games', status: 'Cancelled', pickupDate: 'Jul 3, 9:00pm', returnDate: 'Jul 11, 9:00am', total: 1520, invoiceStatus: 'Nothing to Invoice' }
];

const RentalDashboard = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [profileOpen, setProfileOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const metrics = { sales: 1945, lateFees: 235, deposit: 710 };

  useEffect(() => {
    // Replace with real backend API call: fetch('/api/admin/rental-orders')
    setOrders(mockOrders);
  }, []);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Reserved': return { backgroundColor: '#28a745', color: '#fff' };
      case 'Picked Up': return { backgroundColor: '#fd7e14', color: '#fff' };
      case 'Late Pickup':
      case 'Late Return': return { backgroundColor: '#dc3545', color: '#fff' };
      case 'Quotation': return { backgroundColor: '#17a2b8', color: '#fff' };
      case 'Cancelled': return { backgroundColor: '#6c757d', color: '#fff' };
      default: return { backgroundColor: '#6c757d', color: '#fff' };
    }
  };

  const getInvoiceStatusStyle = (status) => {
    switch (status) {
      case 'Quotation Sent': return { backgroundColor: '#6f42c1', color: '#fff' };
      case 'Confirmed': return { backgroundColor: '#28a745', color: '#fff' };
      case 'Invoiced': return { backgroundColor: '#007bff', color: '#fff' };
      case 'Nothing to Invoice': return { backgroundColor: '#6c757d', color: '#fff' };
      default: return { backgroundColor: '#e2e8f0', color: '#333' };
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      {/* Top Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '12px 24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <strong style={{ fontSize: '18px' }}>Your Logo</strong>
          <a href="#orders" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Orders</a>
          <a href="#schedule" style={{ textDecoration: 'none', color: '#555' }}>Schedule</a>
          <a href="#products" style={{ textDecoration: 'none', color: '#555' }}>Products</a>
          <a href="#reports" style={{ textDecoration: 'none', color: '#555' }}>Reports</a>
          <a href="#settings" style={{ textDecoration: 'none', color: '#555' }}>Settings</a>
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer' }}
          >
            <span>Name</span>
            <span style={{ fontSize: '12px' }}>▼</span>
          </button>
          {profileOpen && (
            <div style={{ position: 'absolute', right: 0, marginTop: '8px', width: '120px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10 }}>
              <div style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Profile</div>
              <div style={{ padding: '8px 12px', cursor: 'pointer', color: 'red' }}>Logout</div>
            </div>
          )}
        </div>
      </nav>

      {/* Action Header */}
      <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Rental Order</h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>⚙️</button>
            <button style={{ backgroundColor: '#6f42c1', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              New
            </button>
            <input 
              type="text" 
              placeholder="Search orders..." 
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', width: '220px' }} 
            />
          </div>

          {/* View Switcher Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>View Switcher</span>
            <button 
              onClick={() => setViewMode('list')} 
              style={{ padding: '6px 10px', backgroundColor: viewMode === 'list' ? '#007bff' : '#fff', color: viewMode === 'list' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              ☰ List
            </button>
            <button 
              onClick={() => setViewMode('kanban')} 
              style={{ padding: '6px 10px', backgroundColor: viewMode === 'kanban' ? '#007bff' : '#fff', color: viewMode === 'kanban' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              📊 Kanban
            </button>
          </div>
        </div>

        {/* Filter Badges & Financial Metrics */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ backgroundColor: '#ffc107', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>2 Today</button>
            <button style={{ backgroundColor: '#e0cffc', color: '#6f42c1', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>3 Pickup</button>
            <button style={{ backgroundColor: '#e0cffc', color: '#6f42c1', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>3 Return</button>
            <button style={{ backgroundColor: '#f8d7da', color: '#dc3545', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>1 Late</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#f1f3f5', padding: '6px 16px', borderRadius: '6px' }}>
            <select style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
            <span style={{ fontSize: '13px' }}>Sales: <strong>${metrics.sales}</strong></span>
            <span style={{ fontSize: '13px' }}>Late Fees: <strong>${metrics.lateFees}</strong></span>
            <span style={{ fontSize: '13px' }}>Deposit: <strong>${metrics.deposit}</strong></span>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div style={{ marginTop: '20px' }}>
        {viewMode === 'list' ? (
          /* List View Table */
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #dee2e6', color: '#6c757d' }}>
                  <th style={{ padding: '12px' }}><input type="checkbox" /></th>
                  <th style={{ padding: '12px' }}>Order Reference</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Pickup Date</th>
                  <th style={{ padding: '12px' }}>Return Date</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}>Invoice Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '12px' }}><input type="checkbox" /></td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.id}</td>
                    <td style={{ padding: '12px' }}>{item.customer}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ ...getStatusBadgeStyle(item.status), padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{item.pickupDate}</td>
                    <td style={{ padding: '12px' }}>{item.returnDate}</td>
                    <td style={{ padding: '12px' }}>${item.total}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ ...getInvoiceStatusStyle(item.invoiceStatus), padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {item.invoiceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Kanban View Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {orders.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{item.customer}</strong>
                  <span>{item.product}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#6c757d', fontSize: '13px' }}>{item.id}</span>
                  <strong style={{ fontSize: '16px' }}>${item.total}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <span style={{ fontSize: '12px', color: '#6c757d' }}>Rental Duration</span>
                  <span style={{ ...getStatusBadgeStyle(item.status), padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalDashboard;
