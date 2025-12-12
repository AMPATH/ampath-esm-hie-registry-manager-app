import React from 'react';
import { type ShrIdentifier } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@carbon/react';

type ShrIdentifierDetailsComponentProps = {
  shrIdentifier: ShrIdentifier;
};
const ShrIdentifierDetailsComponent: React.FC<ShrIdentifierDetailsComponentProps> = ({ shrIdentifier }) => {
  if (!shrIdentifier) {
    return <>No Data to display...</>;
  }
  return (
    <>
      <Table aria-label="identifiers table" size="lg">
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>System : </strong>
            </TableCell>
            <TableCell>{shrIdentifier.system}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Value : </strong>
            </TableCell>
            <TableCell>{shrIdentifier.value}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ShrIdentifierDetailsComponent;
