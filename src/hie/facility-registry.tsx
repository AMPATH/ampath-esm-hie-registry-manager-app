import React, { useMemo } from 'react';

const DUMMY_FACILITIES = [
  { uuid: 'fac-1', name: 'Mosoriot Health Centre', code: 'MOS' },
  { uuid: 'fac-2', name: 'AMPATH Eldoret', code: 'ELD' },
  { uuid: 'fac-3', name: 'MTRH Clinic', code: 'MTRH' }
];

export default function FacilityRegistryPage() {
  const facilities = useMemo(() => DUMMY_FACILITIES, []);
  return (
    <div style={{ padding: '1.25rem' }}>
      <h2>HIE Registry Manager – Facility Registry</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Code</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(f => (
            <tr key={f.uuid}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.code}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.name}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <button onClick={() => alert(`Sync facility ${f.name}`)}>Sync</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
