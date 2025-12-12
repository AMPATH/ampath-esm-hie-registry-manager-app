import React from 'react';
import { type ShrMedicationRequest } from '../types';
import ShrIdentifierDetailsComponent from '../shr-identifier/details/shr-identifier-details.component';
import ShrCodingComponent from '../shr-coding/shr-coding.component';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrMedicationRequestDetailsComponentProps = {
  shrMedicationRequest: ShrMedicationRequest;
};
const ShrMedicationRequestDetailsComponent: React.FC<ShrMedicationRequestDetailsComponentProps> = ({
  shrMedicationRequest,
}) => {
  if (!shrMedicationRequest) {
    return <>No SHR Medication Request Data...</>;
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Medication Request</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong> ID: </strong>
            </TableCell>
            <TableCell>{shrMedicationRequest.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong> Status: </strong>
            </TableCell>
            <TableCell>{shrMedicationRequest.status}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Intent: </strong>
            </TableCell>
            <TableCell>{shrMedicationRequest.intent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Priority: </strong>
            </TableCell>
            <TableCell>{shrMedicationRequest.priority}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Identifier : </strong>
            </TableCell>
            <TableCell>
              {shrMedicationRequest.identifier ? (
                <>
                  {shrMedicationRequest.identifier.map((id) => {
                    return <ShrIdentifierDetailsComponent shrIdentifier={id} />;
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
                <TableCell>{shrMedicationRequest.subject.reference}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong> Type :</strong>
                </TableCell>
                <TableCell>{shrMedicationRequest.subject.reference}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Identifier : </strong>
                </TableCell>
                <TableCell>
                  <ShrIdentifierDetailsComponent shrIdentifier={shrMedicationRequest.subject.identifier} />
                </TableCell>
              </TableRow>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Medication Codeable Concept: </strong>
            </TableCell>
            <TableCell>
              {shrMedicationRequest.medicationCodeableConcept &&
              shrMedicationRequest.medicationCodeableConcept.coding ? (
                <>
                  <TableRow>
                    <TableCell>Text:</TableCell>
                    <TableCell>{shrMedicationRequest.medicationCodeableConcept.text}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {shrMedicationRequest.medicationCodeableConcept.coding.map((shrCode) => {
                        return (
                          <>
                            <ShrCodingComponent shrCoding={shrCode} />
                          </>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {}
            </TableCell>
          </TableRow>
          {shrMedicationRequest.encounter ? (
            <>
              <TableRow>
                <TableCell>
                  <strong>Encounter: </strong>
                </TableCell>
                <TableCell>
                  <TableRow>
                    <TableCell>
                      <strong>Reference: </strong>
                    </TableCell>
                    <TableCell>{shrMedicationRequest.encounter.reference}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Display: </strong>
                    </TableCell>
                    <TableCell>{shrMedicationRequest.encounter.display}</TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          <TableRow>
            <TableCell>
              <strong>Authored On: </strong>
            </TableCell>
            <TableCell>{shrMedicationRequest.authoredOn}</TableCell>
          </TableRow>
          {shrMedicationRequest.requester ? (
            <>
              <TableRow>
                <TableCell>
                  <strong>Requester: </strong>
                </TableCell>
                <TableCell>
                  <TableRow>
                    <TableCell>
                      <strong>Reference : </strong>
                    </TableCell>
                    <TableCell>{shrMedicationRequest?.requester.reference}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Type : </strong>
                    </TableCell>
                    <TableCell>{shrMedicationRequest?.requester.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Display : </strong>
                    </TableCell>
                    <TableCell>{shrMedicationRequest?.requester.display}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Identifier : </strong>
                    </TableCell>
                    <TableCell>
                      {shrMedicationRequest?.requester?.identifier ? (
                        <>
                          <ShrIdentifierDetailsComponent shrIdentifier={shrMedicationRequest?.requester?.identifier} />
                        </>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {shrMedicationRequest.note ? (
            <>
              <TableRow>
                <TableCell>
                  <strong>Note: </strong>
                </TableCell>
                <TableCell>
                  {shrMedicationRequest.note.map((note) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <strong> Author: </strong>
                          </TableCell>
                          <TableCell>{note?.authorString}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong> Time: </strong>
                          </TableCell>
                          <TableCell>{note?.time}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong> Text: </strong>
                          </TableCell>
                          <TableCell>{note?.text}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {shrMedicationRequest.dosageInstruction ? (
            <>
              <TableRow>
                <TableCell>
                  <strong>Dosage Instruction: </strong>
                </TableCell>
                <TableCell>
                  {shrMedicationRequest.dosageInstruction.map((d) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <strong> Text: </strong>
                          </TableCell>
                          <TableCell>{d?.text}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong> As Needed: </strong>
                          </TableCell>
                          <TableCell>{d?.asNeededBoolean}</TableCell>
                        </TableRow>
                        {d.timing ? (
                          <>
                            <TableRow>
                              <TableCell>
                                <strong> Timing: </strong>
                              </TableCell>
                              <TableCell>
                                {d.timing.repeat ? (
                                  <>
                                    <TableRow>
                                      <TableCell>Repeat</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        <TableRow>
                                          <TableCell>
                                            <strong>Duration : </strong>
                                          </TableCell>
                                          <TableCell>
                                            {d.timing.repeat.duration}
                                            {d.timing.repeat.durationUnit}
                                          </TableCell>
                                        </TableRow>
                                      </TableCell>
                                    </TableRow>
                                    {d.timing.code ? (
                                      <>
                                        <TableRow>
                                          <TableCell>
                                            <strong>Code</strong>
                                          </TableCell>
                                          <TableCell>
                                            {d.timing.code.coding.map((code) => {
                                              return (
                                                <>
                                                  <ShrCodingComponent shrCoding={code} />
                                                </>
                                              );
                                            })}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </TableCell>
                            </TableRow>
                            {d.route ? (
                              <>
                                <TableRow>
                                  <TableCell>
                                    <strong>Route: </strong>
                                  </TableCell>
                                  <TableCell>
                                    {d.route.coding.map((code) => {
                                      return (
                                        <>
                                          <TableRow>
                                            <ShrCodingComponent shrCoding={code} />
                                          </TableRow>
                                        </>
                                      );
                                    })}
                                  </TableCell>
                                </TableRow>
                                {d.doseAndRate ? (
                                  <>
                                    <TableRow>
                                      <TableCell>
                                        <strong>Dose and Rate: </strong>
                                      </TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell></TableCell>
                                      <TableCell>
                                        {d.doseAndRate.map((code) => {
                                          return (
                                            <>
                                              <TableRow>
                                                <TableCell>
                                                  <strong> Dose Quantity : </strong>
                                                </TableCell>
                                                <TableCell>
                                                  <TableRow>
                                                    <TableCell>
                                                      <strong>Value : </strong>
                                                    </TableCell>
                                                    <TableCell>{code.doseQuantity.value}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell>
                                                      <strong>Unit : </strong>
                                                    </TableCell>
                                                    <TableCell>{code.doseQuantity.unit}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell>
                                                      <strong>Code : </strong>
                                                    </TableCell>
                                                    <TableCell>{code.doseQuantity.code}</TableCell>
                                                  </TableRow>
                                                </TableCell>
                                              </TableRow>
                                            </>
                                          );
                                        })}
                                      </TableCell>
                                    </TableRow>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {shrMedicationRequest.dispenseRequest ? (
            <>
              <TableRow>
                <TableCell>
                  <strong>Dispense Request : </strong>
                </TableCell>
                <TableCell>
                  {shrMedicationRequest.dispenseRequest.validityPeriod ? (
                    <>
                      <TableRow>
                        <TableCell>
                          <strong> ValidityPeriod : </strong>
                        </TableCell>

                        <TableCell>
                          <TableRow>
                            <TableCell>Start :</TableCell>
                            <TableCell>{shrMedicationRequest.dispenseRequest.validityPeriod.start}</TableCell>
                          </TableRow>
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <></>
                  )}
                  {shrMedicationRequest.dispenseRequest.numberOfRepeatsAllowed !== null ? (
                    <>
                      <TableRow>
                        <TableCell>
                          <strong> Number Of Repeats Allowed : </strong>
                        </TableCell>

                        <TableCell>{shrMedicationRequest.dispenseRequest.numberOfRepeatsAllowed}</TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>
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

export default ShrMedicationRequestDetailsComponent;
