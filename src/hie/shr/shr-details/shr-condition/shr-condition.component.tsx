import React from 'react';
import { type ShrCondition } from '../types';
import ShrCodingComponent from '../shr-coding/shr-coding.component';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrConditionComponentProps = {
  shrCondition: ShrCondition;
};
const ShrConditionComponent: React.FC<ShrConditionComponentProps> = ({ shrCondition }) => {
  if (!shrCondition) {
    return <h4>No SHR Condition</h4>;
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Condition</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID :</TableCell>
            <TableCell>{shrCondition.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Updated:</TableCell>
            <TableCell>{shrCondition?.meta?.lastUpdated}</TableCell>
          </TableRow>
          {shrCondition.clinicalStatus ? (
            <>
              <TableRow>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHead>Clinical Status:</TableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shrCondition.clinicalStatus.coding ? (
                      <>
                        <TableRow>
                          <TableCell>Coding:</TableCell>
                        </TableRow>
                        {shrCondition.clinicalStatus.coding.map((coding) => {
                          return (
                            <>
                              <ShrCodingComponent shrCoding={coding} />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {shrCondition.verificationStatus ? (
            <>
              <TableRow>
                <Table>
                  <TableHead>
                    <TableHeader>Verification Status:</TableHeader>
                  </TableHead>
                  <TableBody>
                    {shrCondition.verificationStatus.coding ? (
                      <>
                        <TableRow>
                          <TableCell>Coding:</TableCell>
                        </TableRow>
                        {shrCondition.verificationStatus.coding.map((coding) => {
                          return (
                            <>
                              <TableRow>
                                <TableCell>
                                  <ShrCodingComponent shrCoding={coding} />
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {shrCondition.category ? (
            <>
              <TableRow>
                <Table>
                  <TableHead>
                    <TableHeader>Category:</TableHeader>
                  </TableHead>
                  <TableBody>
                    {shrCondition.category ? (
                      <>
                        {shrCondition.category.map((category) => {
                          return (
                            <>
                              {category.coding.map((coding) => {
                                return (
                                  <>
                                    <ShrCodingComponent shrCoding={coding} />
                                  </>
                                );
                              })}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
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

export default ShrConditionComponent;
