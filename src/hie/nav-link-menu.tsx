import React, { useState } from 'react';
import { navigate } from '@openmrs/esm-framework';

export default function NavLinkMenu() {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const goTo = (path) => {
    navigate({ to: `${window.spaBase}/${path}` });
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', padding: '0.5rem 1rem' }}>
      <div
        onClick={toggleDropdown}
        style={{
          color: '#ffffff',
          fontWeight: '600',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.25rem',
        }}
      >
        <span>HIE</span>
        <span style={{ fontSize: '0.8rem' }}>▾</span>
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '2.2rem',
            left: '0',
            minWidth: '180px',
            backgroundColor: '#004144',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 100,
            padding: '0.25rem 0',
          }}
        >

           <div
            onClick={() => goTo('hie/health-workers')}
            style={menuItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#005d5d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Health Worker Registry
          </div>
          
          <div
            onClick={() => goTo('hie/facilities')}
            style={menuItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#005d5d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Facility Registry
          </div>
        </div>
      )}
    </div>
  );
}

const menuItemStyle = {
  color: 'white',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  fontSize: '0.9rem',
};
