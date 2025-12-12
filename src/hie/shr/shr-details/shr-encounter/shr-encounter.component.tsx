import React from 'react';
import { type ShrEncounter } from '../types';
import ShrIdentifierDetailsComponent from '../shr-identifier/details/shr-identifier-details.component';
import ShrCodingComponent from '../shr-coding/shr-coding.component';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrEncounterComponentProps = {
  shrEncounter: ShrEncounter;
};
const ShrEncounterComponent: React.FC<ShrEncounterComponentProps> = ({ shrEncounter }) => {
  if (!shrEncounter) {
    return <>No SHR Encounter Data</>;
  }
  return (
    <>
      <div className="col-lg-12 col-sm-12 col-xs-12">
        <Table aria-label="shr encounter table" size="lg">
          <TableHead>
            <TableRow>
              <TableHeader>Encounter</TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>ID: </strong>
              </TableCell>
              <TableCell>{shrEncounter.id}</TableCell>
            </TableRow>
            {shrEncounter.identifier ? (
              <>
                {shrEncounter.identifier.map((id) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          <strong>Identifier :</strong>
                        </TableCell>
                        <TableCell>
                          <ShrIdentifierDetailsComponent shrIdentifier={id} />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            <TableRow>
              <TableCell>
                <strong>Status :</strong>
              </TableCell>
              <TableCell>{shrEncounter.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>className : </strong>
              </TableCell>
              <TableCell>
                <ShrCodingComponent shrCoding={shrEncounter['className']} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Type :</strong>
              </TableCell>
              <TableCell>
                {shrEncounter.type.map((type) => {
                  return (
                    <>
                      {type.coding.map((shrCode) => {
                        return (
                          <>
                            <ShrCodingComponent shrCoding={shrCode} />
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Priority :</strong>
              </TableCell>
              <TableCell>
                {shrEncounter.priority && shrEncounter.priority.coding ? (
                  <>
                    {shrEncounter.priority.coding.map((shrCode) => {
                      return (
                        <>
                          <ShrCodingComponent shrCoding={shrCode} />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Subject : </strong>
              </TableCell>
              <TableCell>
                <TableRow>
                  <TableCell>
                    <strong> Reference :</strong>
                  </TableCell>
                  <TableCell>{shrEncounter.subject.reference}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Identifier : </strong>
                  </TableCell>
                  <TableCell>
                    <ShrIdentifierDetailsComponent shrIdentifier={shrEncounter.subject.identifier} />
                  </TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Participant : </strong>
              </TableCell>
              <TableCell>
                {shrEncounter.participant ? (
                  <>
                    {shrEncounter?.participant.map((participant) => {
                      return (
                        <>
                          {participant.individual ? (
                            <>
                              <ShrIdentifierDetailsComponent shrIdentifier={participant.individual.identifier} />
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Period :</strong>
              </TableCell>
              <TableCell>
                <TableRow>
                  <TableCell>
                    <strong> Start : </strong>
                  </TableCell>
                  <TableCell>{shrEncounter.period.start}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>End : </strong>
                  </TableCell>
                  <TableCell>{shrEncounter.period.end}</TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Service Provider : </strong>
              </TableCell>
              <TableCell>
                <TableRow>
                  <TableCell>
                    <strong> Reference :</strong>
                  </TableCell>
                  <TableCell>{shrEncounter.serviceProvider.reference}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Identifier : </strong>
                  </TableCell>
                  <TableCell>
                    <ShrIdentifierDetailsComponent shrIdentifier={shrEncounter.serviceProvider.identifier} />
                  </TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ShrEncounterComponent;
