import React from 'react';
import { type ShrServiceRequest } from '../types';
import ShrIdentifierDetailsComponent from '../shr-identifier/details/shr-identifier-details.component';
import ShrCodingComponent from '../shr-coding/shr-coding.component';
import ShrObservationComponent from '../shr-observation/shr-observation.component';
import ShrSpecimenComponent from '../shr-specimen/shr-specimen.component';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

type ShrServiceRequestProps = {
  shrServiceRequest: ShrServiceRequest;
};
const ShrServiceRequestComponent: React.FC<ShrServiceRequestProps> = ({ shrServiceRequest }) => {
  if (!shrServiceRequest) {
    return (
      <>
        <h4>No service request data</h4>
      </>
    );
  }
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Table aria-label="service request table" size="lg">
          <TableHead>
            <TableRow>
              <TableHeader>Service Request</TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <strong>ID: </strong>
              </TableCell>
              <TableCell>{shrServiceRequest.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Identifier: </strong>
              </TableCell>
              <TableCell>
                {shrServiceRequest.identifier &&
                  shrServiceRequest.identifier.map((identifier) => {
                    return <ShrIdentifierDetailsComponent shrIdentifier={identifier} />;
                  })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Based On: </strong>
              </TableCell>
              <TableCell>
                {shrServiceRequest.basedOn ? (
                  shrServiceRequest.basedOn.map((basedOn) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <strong>Type: </strong>
                          </TableCell>
                          <TableCell>{basedOn.type}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Identifier : </strong>
                          </TableCell>
                          <TableCell>
                            <ShrIdentifierDetailsComponent shrIdentifier={basedOn.identifier} />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Status: </strong>
              </TableCell>
              <TableCell>{shrServiceRequest.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Intent: </strong>
              </TableCell>
              <TableCell>{shrServiceRequest.intent}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Priority: </strong>
              </TableCell>
              <TableCell>{shrServiceRequest.priority}</TableCell>
            </TableRow>
            {shrServiceRequest.occurrencePeriod && shrServiceRequest.occurrencePeriod?.start ? (
              <TableRow>
                <TableCell>
                  <strong>Occurrence Period: </strong>
                </TableCell>
                <TableCell>
                  <TableRow>
                    <TableCell>
                      <strong>Start: </strong>
                    </TableCell>
                    <TableCell>{shrServiceRequest.occurrencePeriod?.start}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>End: </strong>
                    </TableCell>
                    <TableCell>{shrServiceRequest.occurrencePeriod?.end}</TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            <TableRow>
              <TableCell>
                <strong>Authored On: </strong>
              </TableCell>
              <TableCell>{shrServiceRequest.authoredOn}</TableCell>
            </TableRow>
            {shrServiceRequest.category ? (
              <TableRow>
                <TableCell>
                  <strong>Category: </strong>
                </TableCell>
                <TableCell>
                  {shrServiceRequest.category.map((cat) => {
                    return (
                      <>
                        <TableRow>
                          <Table>
                            <TableHead> </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <strong>Text : </strong>
                                </TableCell>
                                <TableCell>{cat?.text}</TableCell>
                              </TableRow>
                              {cat.coding &&
                                cat.coding.map((coding) => {
                                  return (
                                    <>
                                      <TableRow>
                                        <TableCell>
                                          <strong>Coding :</strong>
                                        </TableCell>
                                        <ShrCodingComponent shrCoding={coding} />
                                      </TableRow>
                                    </>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableRow>
                      </>
                    );
                  })}
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {shrServiceRequest.subject ? (
              <TableRow>
                <TableCell>
                  <strong>Subject: </strong>
                </TableCell>
                <TableCell>
                  <TableRow>
                    <TableCell>
                      <strong>Reference: </strong>
                    </TableCell>
                    <TableCell>{shrServiceRequest.subject.reference}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Type: </strong>
                    </TableCell>
                    <TableCell>{shrServiceRequest.subject.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Identifier: </strong>
                    </TableCell>
                    <TableCell>
                      <ShrIdentifierDetailsComponent shrIdentifier={shrServiceRequest.subject.identifier} />
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {shrServiceRequest.requester ? (
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
                      <TableCell>{shrServiceRequest?.requester.reference}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Type : </strong>
                      </TableCell>
                      <TableCell>{shrServiceRequest?.requester.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Display : </strong>
                      </TableCell>
                      <TableCell>{shrServiceRequest?.requester.display}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Identifier : </strong>
                      </TableCell>
                      <TableCell>
                        {shrServiceRequest?.requester?.identifier ? (
                          <ShrIdentifierDetailsComponent shrIdentifier={shrServiceRequest?.requester?.identifier} />
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
            {shrServiceRequest.performer ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong> Performer: </strong>
                  </TableCell>
                  <TableCell>
                    {shrServiceRequest.performer.map((performer) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <strong> Reference: </strong>
                            </TableCell>
                            <TableCell>{performer.reference}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong> Type: </strong>
                            </TableCell>
                            <TableCell>{performer.type}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong> Display: </strong>
                            </TableCell>
                            <TableCell>{performer.display}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong> Identifier: </strong>
                            </TableCell>
                            <TableCell>
                              <ShrIdentifierDetailsComponent shrIdentifier={performer.identifier} />
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
            {shrServiceRequest.reasonCode ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong> Reason Code: </strong>
                  </TableCell>
                  <TableCell>
                    {shrServiceRequest.reasonCode.map((reasonCode) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <strong>Text: </strong>
                            </TableCell>
                            <TableCell>{reasonCode.text}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Coding: </strong>
                            </TableCell>
                            <TableCell>
                              {reasonCode.coding.map((coding) => {
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
            {shrServiceRequest.supportingInfo ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong>Supporting Info: </strong>
                  </TableCell>
                  <TableCell>
                    {shrServiceRequest.supportingInfo.map((si) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <strong>Reference: </strong>
                            </TableCell>
                            <TableCell>{si.reference}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Identifier: </strong>
                            </TableCell>
                            <TableCell>
                              {si.identifier ? (
                                <>
                                  <TableRow>
                                    <TableCell>
                                      <ShrIdentifierDetailsComponent shrIdentifier={si.identifier} />
                                    </TableCell>
                                  </TableRow>
                                </>
                              ) : (
                                <></>
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Display: </strong>
                            </TableCell>
                            <TableCell>{si.display}</TableCell>
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
            {shrServiceRequest.note ? (
              <TableRow>
                <TableCell>
                  <strong>Note: </strong>
                </TableCell>
                <TableCell>
                  {shrServiceRequest.note.map((note) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>{note?.text}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {shrServiceRequest.encounter ? (
              <>
                <TableRow>
                  <TableCell>
                    <strong>Encounter: </strong>
                  </TableCell>
                  <TableCell>
                    <TableRow>
                      <TableCell>
                        <strong> Display: </strong>
                      </TableCell>
                      <TableCell>{shrServiceRequest.encounter?.display}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Reference: </strong>
                      </TableCell>
                      <TableCell>{shrServiceRequest.encounter.reference}</TableCell>
                    </TableRow>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <></>
            )}
            {shrServiceRequest.contained ? (
              <>
                {shrServiceRequest.contained.map((contained) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          <strong>Observation: </strong>
                        </TableCell>
                        <TableCell>
                          {contained.resourceType === 'Observation' ? (
                            <ShrObservationComponent shrObservation={contained} />
                          ) : (
                            <></>
                          )}
                          {contained.resourceType === 'Specimen' ? (
                            <ShrSpecimenComponent shrSpecimen={contained} />
                          ) : (
                            <></>
                          )}
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
      </div>
    </>
  );
};

export default ShrServiceRequestComponent;
