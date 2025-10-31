import React, { useMemo } from 'react';

const DUMMY_HEALTHWORKERS = [
  { uuid: 'hw-1', name: 'John Doe', registration: 'REG-1001' },
  { uuid: 'hw-2', name: 'Jane Smith', registration: 'REG-1002' },
  { uuid: 'hw-3', name: 'Alice Brown', registration: 'REG-1003' }
];

export default function HealthWorkerRegistryPage() {
  const healthWorkers = useMemo(() => DUMMY_HEALTHWORKERS, []);
  return (
    <div style={{ padding: '1.25rem' }}>
      <h2>HIE Registry Manager – Health Worker Registry</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Reg. No</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {healthWorkers.map(hw => (
            <tr key={hw.uuid}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{hw.registration}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{hw.name}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <button onClick={() => alert(`Sync health worker ${hw.name}`)}>Sync</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
