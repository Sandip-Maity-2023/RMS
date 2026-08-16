import React from 'react';

const SettingsPage = () => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', marginTop: '20px' }}>
      <h2>Organization Rental Settings</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
        <label>
          <strong>Default Late Fee Rate ($/Hour):</strong>
          <input type="number" defaultValue={15} style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </label>
        <label>
          <strong>Default Security Deposit ($):</strong>
          <input type="number" defaultValue={100} style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </label>
        <label>
          <strong>Grace Period (Minutes):</strong>
          <input type="number" defaultValue={30} style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </label>
        <button type="button" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Configuration
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
