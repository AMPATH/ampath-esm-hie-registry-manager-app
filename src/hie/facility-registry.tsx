import React, { useMemo } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Grid,
  Column,
} from '@carbon/react';
import { Download } from '@carbon/icons-react';
import { showSnackbar } from '@openmrs/esm-framework';
import styles from './facility-registry.scss'; // optional custom styling

const DUMMY_FACILITIES = [
  { uuid: 'fac-1', name: 'Mosoriot Health Centre', code: 'MOS' },
  { uuid: 'fac-2', name: 'AMPATH Eldoret', code: 'ELD' },
  { uuid: 'fac-3', name: 'MTRH Clinic', code: 'MTRH' },
];

export default function FacilityRegistryPage() {
  const facilities = useMemo(() => DUMMY_FACILITIES, []);

  const handleSync = (facility) => {
    showSnackbar({
      title: 'Sync started',
      subtitle: `${facility.name} is being synced.`,
      kind: 'info',
    });
  };

  const headers = [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'actions', header: 'Actions' },
  ];

  const rows = facilities.map((f) => ({
    id: f.uuid,
    code: f.code,
    name: f.name,
    actions: f.uuid,
  }));

  return (
    <div className="omrs-content"> {/* ✅ ensures proper layout under top bar and beside sidebar */}
      <Grid fullWidth>
        <Column sm={4} md={8} lg={12}>
          <h2 className="cds--heading-03" style={{ marginBottom: '1rem' }}>
            HIE Registry Manager – Facility Registry
          </h2>

          <DataTable rows={rows} headers={headers}>
            {({ rows, headers, getHeaderProps, getRowProps }) => (
              <TableContainer>
                <Table size="sm">
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader key={header.key} {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        {row.cells.map((cell) => {
                          if (cell.info.header === 'actions') {
                            const facility = facilities.find((f) => f.uuid === row.id);
                            return (
                              <TableCell key={cell.id}>
                                <Button
                                  kind="tertiary"
                                  size="sm"
                                  renderIcon={Download}
                                  onClick={() => handleSync(facility)}
                                >
                                  Sync
                                </Button>
                              </TableCell>
                            );
                          }
                          return <TableCell key={cell.id}>{cell.value}</TableCell>;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </Column>
      </Grid>
    </div>
  );
}
