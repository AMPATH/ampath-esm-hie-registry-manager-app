import React from 'react';
import { type ShrObservation } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrObservationComponentProps = {
  shrObservation: ShrObservation;
};
const ShrObservationComponent: React.FC<ShrObservationComponentProps> = ({ shrObservation }) => {
  if (!shrObservation) {
    return <>No Observation</>;
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Observation</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID :</TableCell>
            <TableCell>{shrObservation?.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status :</TableCell>
            <TableCell>{shrObservation?.status}</TableCell>
          </TableRow>
          {shrObservation.code && shrObservation.code.coding ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Coding</TableHeader>
                    <TableHeader></TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shrObservation.code.coding.map((code) => {
                    return (
                      <TableRow>
                        <TableCell>Display :</TableCell>
                        <TableCell>{code?.display}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : (
            <></>
          )}
          {shrObservation.valueCodeableConcept && shrObservation.valueCodeableConcept.coding ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Coded Concept</TableHeader>
                    <TableHeader></TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shrObservation.valueCodeableConcept.coding.map((concept) => {
                    return (
                      <TableRow>
                        <TableCell>Display :</TableCell>
                        <TableCell>{concept?.display}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ShrObservationComponent;
