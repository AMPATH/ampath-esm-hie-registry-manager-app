import React from 'react';
import { navigate } from '@openmrs/esm-framework';

export default function NavLinkMenu() {
  return (
    <div style={{ padding: '0.5rem 1rem' }}>
      <a
        onClick={() => navigate({ to: '/hie/facilities' })}
        style={{ display: 'block', cursor: 'pointer' }}
      >
        Facility Registry
      </a>

      <a
        onClick={() => navigate({ to: '/hie/health-workers' })}
        style={{ display: 'block', cursor: 'pointer', marginTop: '0.5rem' }}
      >
        Health Worker Registry
      </a>
    </div>
  );
}
