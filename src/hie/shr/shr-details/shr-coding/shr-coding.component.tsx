import React from 'react';
import { type ShrCoding } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrCodingComponentProps = {
  shrCoding: ShrCoding;
};
const ShrCodingComponent: React.FC<ShrCodingComponentProps> = ({ shrCoding }) => {
  if (!shrCoding) {
    return <>No SHR Coding Data</>;
  }
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {shrCoding.system ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong>System :</strong>
                  </TableCell>
                  <TableCell>{shrCoding.system}</TableCell>
                </TableRow>
              </>
            ) : (
              <></>
            )}
            {shrCoding.code ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong>Code :</strong>
                  </TableCell>
                  <TableCell>{shrCoding.code}</TableCell>
                </TableRow>
              </>
            ) : (
              <></>
            )}

            {shrCoding.display ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong>Display :</strong>
                  </TableCell>
                  <TableCell>{shrCoding.display}</TableCell>
                </TableRow>
              </>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ShrCodingComponent;
