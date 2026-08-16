import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('list');
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({ sales: 0, lateFees: 0, deposit: 0 });

  useEffect(() => {
    // Fetch order data filtered server-side based on user role and permissions
    const mockOrders = [
      { id: 'S00001', customer: 'Wood Corner', product: 'TV', status: 'Reserved', pickupDate: 'Jul 6, 6:30pm', returnDate: 'Jul 10, 6:30pm', total: 1520, invoiceStatus: 'Invoiced' },
      { id: 'S00005', customer: 'Smith', product: 'Projector', status: 'Picked Up', pickupDate: 'Jul 10, 6:30pm', returnDate: 'Jul 10, 8:30pm', total: 1520, invoiceStatus: 'Confirmed' },
      { id: 'S00010', customer: 'John', product: 'Printer', status: 'Late Pickup', pickupDate: 'Jul 6, 6:30pm', returnDate: 'Jul 10, 6:30pm', total: 1520, invoiceStatus: 'Invoiced' }
    ];

    setOrders(mockOrders);
    setMetrics({ sales: 1945, lateFees: 235, deposit: 710 });
  }, [user]);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Reserved': return { backgroundColor: '#28a745', color: '#fff' };
      case 'Picked Up': return { backgroundColor: '#fd7e14', color: '#fff' };
      case 'Late Pickup':
      case 'Late Return': return { backgroundColor: '#dc3545', color: '#fff' };
      default: return { backgroundColor: '#6c757d', color: '#fff' };
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Header Actions */}
      <div style={{ backgroundColor: '#fff', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Rental Orders</h2>
            
            {/* Admin and Vendor only: Create New Order / Quotation */}
            {(user.role === 'admin' || user.role === 'vendor') && (
              <button style={{ backgroundColor: '#6f42c1', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                + New Quotation
              </button>
            )}

            <input type="text" placeholder="Search orders..." style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', width: '220px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>View Switcher</span>
            <button onClick={() => setViewMode('list')} style={{ padding: '6px 10px', backgroundColor: viewMode === 'list' ? '#007bff' : '#fff', color: viewMode === 'list' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
              List
            </button>
            <button onClick={() => setViewMode('kanban')} style={{ padding: '6px 10px', backgroundColor: viewMode === 'kanban' ? '#007bff' : '#fff', color: viewMode === 'kanban' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
              Kanban
            </button>
          </div>
        </div>

        {/* Filter Badges & Restricted Financial Summaries */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ backgroundColor: '#ffc107', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold' }}>2 Today</button>
            <button style={{ backgroundColor: '#e0cffc', color: '#6f42c1', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold' }}>3 Pickup</button>
            <button style={{ backgroundColor: '#e0cffc', color: '#6f42c1', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold' }}>3 Return</button>
            <button style={{ backgroundColor: '#f8d7da', color: '#dc3545', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold' }}>1 Late</button>
          </div>

          {/* Admin & Vendor Metric Visibility */}
          {(user.role === 'admin' || user.role === 'vendor') && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#f1f3f5', padding: '6px 16px', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px' }}>Sales: <strong>${metrics.sales}</strong></span>
              {user.role === 'admin' && (
                <>
                  <span style={{ fontSize: '13px' }}>Late Fees: <strong>${metrics.lateFees}</strong></span>
                  <span style={{ fontSize: '13px' }}>Deposits Held: <strong>${metrics.deposit}</strong></span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Order View */}
      <div style={{ marginTop: '20px' }}>
        {viewMode === 'list' ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #dee2e6', color: '#6c757d' }}>
                  <th style={{ padding: '12px' }}>Order Ref</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Pickup Date</th>
                  <th style={{ padding: '12px' }}>Return Date</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  {user.role === 'admin' && <th style={{ padding: '12px' }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e9ecef' }}>
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
                    {user.role === 'admin' && (
                      <td style={{ padding: '12px' }}>
                        <button style={{ padding: '4px 8px', border: '1px solid #dc3545', color: '#dc3545', background: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Process Return
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

export default Dashboard;
