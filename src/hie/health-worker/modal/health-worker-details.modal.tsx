import React from 'react';
import { type PractitionerMessage } from '../../../types';
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
} from '@carbon/react';
import { formatDate } from '../../hie-resource';

interface HealthWorkerModalProps {
  selectedPractitioner: PractitionerMessage;
  isModalOpen: boolean;
  onRequestClose: () => void;
}
const HealthWorkerModal: React.FC<HealthWorkerModalProps> = ({ selectedPractitioner, isModalOpen, onRequestClose }) => {
  return (
    <>
      <Modal
        open={isModalOpen}
        onRequestClose={onRequestClose}
        modalHeading="Practitioner Details"
        primaryButtonText="Close"
        onRequestSubmit={onRequestClose}
        size="lg"
        passiveModal
      >
        {selectedPractitioner && (
          <div style={{ padding: '1rem' }}>
            {/* Personal Information */}
            <div style={{ marginBottom: '2rem' }}>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                Personal Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Full Name</strong>
                    <span>{selectedPractitioner.membership.full_name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>National ID</strong>
                    <span>{selectedPractitioner.identifiers.identification_number}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Registration ID</strong>
                    <span>{selectedPractitioner.membership.registration_id}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Status</strong>
                    <Tag type={selectedPractitioner.membership.status === 'Licensed' ? 'green' : 'gray'} size="sm">
                      {selectedPractitioner.membership.status}
                    </Tag>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Licensing Body</strong>
                    <span>{selectedPractitioner.membership.licensing_body}</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Phone</strong>
                    <span>{selectedPractitioner.contacts.phone}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Email</strong>
                    <span>{selectedPractitioner.contacts.email}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <strong style={{ minWidth: '150px' }}>Address</strong>
                    <span>{selectedPractitioner.contacts.postal_address}</span>
                  </div>
                  {selectedPractitioner.membership.gender && (
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                      <strong style={{ minWidth: '150px' }}>Gender</strong>
                      <span>{selectedPractitioner.membership.gender}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div style={{ marginBottom: '2rem' }}>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                Professional Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <strong style={{ minWidth: '150px' }}>Professional Cadre</strong>
                  <span>{selectedPractitioner.professional_details.professional_cadre}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <strong style={{ minWidth: '150px' }}>Practice Type</strong>
                  <span>{selectedPractitioner.professional_details.practice_type}</span>
                </div>
                {selectedPractitioner.professional_details.specialty && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong style={{ minWidth: '150px' }}>Specialty</strong>
                    <span>{selectedPractitioner.professional_details.specialty}</span>
                  </div>
                )}
                {selectedPractitioner.professional_details.educational_qualifications && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong style={{ minWidth: '150px' }}>Qualifications</strong>
                    <span>{selectedPractitioner.professional_details.educational_qualifications}</span>
                  </div>
                )}
              </div>
            </div>

            {/* License Information */}
            {selectedPractitioner.licenses && selectedPractitioner.licenses.length > 0 && (
              <div>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  License Information
                </h4>
                <TableContainer>
                  <Table size="sm">
                    <TableHead>
                      <TableRow>
                        <TableHeader>License Type</TableHeader>
                        <TableHeader>License ID</TableHeader>
                        <TableHeader>Start Date</TableHeader>
                        <TableHeader>End Date</TableHeader>
                        <TableHeader>Reference ID</TableHeader>
                        <TableHeader>Status</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedPractitioner.licenses.map((license, idx) => {
                        const isActive = new Date(license.license_end) > new Date();
                        return (
                          <TableRow key={idx}>
                            <TableCell>{license.license_type}</TableCell>
                            <TableCell>{license.id}</TableCell>
                            <TableCell>{formatDate(license.license_start)}</TableCell>
                            <TableCell>{formatDate(license.license_end)}</TableCell>
                            <TableCell>{license.external_reference_id}</TableCell>
                            <TableCell>
                              <Tag type={isActive ? 'green' : 'red'} size="sm">
                                {isActive ? 'Active' : 'Expired'}
                              </Tag>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
export default HealthWorkerModal;
