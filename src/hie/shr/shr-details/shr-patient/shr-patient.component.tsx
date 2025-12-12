import React from 'react';
import { type ShrPatient } from '../types';
import ShrIdentifierDetailsComponent from '../shr-identifier/details/shr-identifier-details.component';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrRendererProps = {
  shrPatient: ShrPatient;
};
const ShrPatientComponent: React.FC<ShrRendererProps> = ({ shrPatient }) => {
  if (!shrPatient) {
    return <>No Patient Data..</>;
  }
  return (
    <>
      <div className="shr-patient-layout">
        <h4>Patient Info</h4>
        <div className="patient-data">
          <Table aria-label="sample table" size="lg">
            <TableHead>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>ID: </strong>
                </TableCell>
                <TableCell>{shrPatient?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Last Updated :</strong>
                </TableCell>
                <TableCell>{shrPatient?.meta?.lastUpdated}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Gender : </strong>
                </TableCell>
                <TableCell>{shrPatient?.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong> Birth Date : </strong>
                </TableCell>
                <TableCell>{shrPatient?.birthDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong> Name : </strong>
                </TableCell>
                <TableCell>
                  {shrPatient.name.map((name) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>{name.text}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong> Identifier : </strong>
                </TableCell>
                <TableCell>
                  {shrPatient.identifier.map((identifier) => {
                    return (
                      <>
                        <ShrIdentifierDetailsComponent shrIdentifier={identifier} />
                      </>
                    );
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ShrPatientComponent;
