import React from 'react';
import { type ShrSpecimen } from '../types';
import styles from './shr-specimen.component.scss';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
type ShrSpecimenProps = {
  shrSpecimen: ShrSpecimen;
};
const ShrSpecimenComponent: React.FC<ShrSpecimenProps> = ({ shrSpecimen }) => {
  if (!shrSpecimen) {
    return <h4>No SHR Specimen found</h4>;
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Specimen</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID :</TableCell>
            <TableCell>{shrSpecimen?.id}</TableCell>
          </TableRow>
          {shrSpecimen.type && shrSpecimen.type.coding ? (
            <>
              <TableRow>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Type</TableHeader>
                      <TableHeader></TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shrSpecimen.type.coding.map((code) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>Display :</TableCell>
                            <TableCell>{code?.display}</TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {shrSpecimen?.collection ? (
            <>
              <TableRow>
                <TableCell>CollectedDateTime :</TableCell>
                <TableCell>{shrSpecimen?.collection.collectedDateTime}</TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ShrSpecimenComponent;
