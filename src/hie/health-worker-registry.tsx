import React, { useState, useEffect } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Grid,
  Column,
  TextInput,
  Select,
  SelectItem,
  Modal,
  Tag,
  InlineLoading,
} from '@carbon/react';
import { Search, UserMultiple } from '@carbon/react/icons';
import { showSnackbar, useSession } from '@openmrs/esm-framework';
import { searchPractitioner, getAllProviders, formatDate } from './hie-resource';
import { type PractitionerMessage, type Provider } from '../types';
import HealthWorkerModal from './health-worker/modal/health-worker-details.modal';

export default function HealthWorkerSearchPage() {
  const session = useSession();
  const [searchBy, setSearchBy] = useState('nationalId');
  const [searchValue, setSearchValue] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<PractitionerMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);
  const [locationUuid, setLocationUuid] = useState<string>('');

  useEffect(() => {
    // Get location UUID from session
    if (session?.sessionLocation?.uuid) {
      setLocationUuid(session.sessionLocation.uuid);
    }
  }, [session]);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      showSnackbar({
        title: 'Validation Error',
        subtitle: 'Please enter a search value',
        kind: 'error',
      });
      return;
    }

    if (!locationUuid) {
      showSnackbar({
        title: 'Error',
        subtitle: 'Location UUID not available. Please ensure you are logged in.',
        kind: 'error',
      });
      return;
    }

    setIsSearching(true);

    try {
      const params: any = {};

      switch (searchBy) {
        case 'nationalId':
          params.nationalId = searchValue.trim();
          break;
        case 'registrationId':
          params.registrationNumber = searchValue.trim();
          break;
        case 'licenseNumber':
          params.licenseNumber = searchValue.trim();
          break;
        case 'name':
          params.name = searchValue.trim();
          break;
      }

      const result = await searchPractitioner(params, locationUuid);

      if (result) {
        setSelectedPractitioner(result);
        setIsModalOpen(true);
        showSnackbar({
          title: 'Success',
          subtitle: 'Practitioner found',
          kind: 'success',
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      showSnackbar({
        title: 'Search Failed',
        subtitle: error.message || 'No practitioner found with the provided information',
        kind: 'error',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleGetAllProviders = async () => {
    if (!locationUuid) {
      showSnackbar({
        title: 'Error',
        subtitle: 'Location UUID not available. Please ensure you are logged in.',
        kind: 'error',
      });
      return;
    }

    setIsLoadingProviders(true);

    try {
      const result = await getAllProviders(locationUuid);
      setProviders(result);
      showSnackbar({
        title: 'Success',
        subtitle: `Found ${result.length} providers`,
        kind: 'success',
      });
    } catch (error) {
      console.error('Error fetching providers:', error);
      showSnackbar({
        title: 'Error',
        subtitle: 'Failed to fetch providers',
        kind: 'error',
      });
    } finally {
      setIsLoadingProviders(false);
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setProviders([]);
    setSelectedPractitioner(null);
  };

  const handleViewDetails = async (provider: Provider) => {
    if (!provider.national_id) {
      showSnackbar({
        title: 'Error',
        subtitle: 'National ID not available for this provider',
        kind: 'warning',
      });
      return;
    }

    if (!locationUuid) {
      showSnackbar({
        title: 'Error',
        subtitle: 'Location UUID not available',
        kind: 'error',
      });
      return;
    }

    setIsSearching(true);

    try {
      const result = await searchPractitioner({ nationalId: provider.national_id }, locationUuid);

      if (result) {
        setSelectedPractitioner(result);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching practitioner details:', error);
      showSnackbar({
        title: 'Error',
        subtitle: 'Failed to fetch practitioner details',
        kind: 'error',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const headers = [
    { key: 'index', header: '#' },
    { key: 'providerName', header: 'PROVIDER NAME' },
    { key: 'nationalId', header: 'NATIONAL ID' },
    { key: 'location', header: 'LOCATION' },
    { key: 'actions', header: 'ACTIONS' },
  ];

  const rows = providers.map((p, idx) => ({
    id: String(p.provider_id),
    index: idx + 1,
    providerName: p.provider_names || 'N/A',
    nationalId: p.national_id,
    location: p.location_name,
  }));

  return (
    <Grid fullWidth className="omrs-main-content" style={{ padding: '1rem' }}>
      <Column sm={4} md={8} lg={16}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Health Worker Search</h2>

        {/* Search Section */}
        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '0 0 200px' }}>
            <Select
              id="searchBy"
              labelText="Search By"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              disabled={isSearching}
            >
              <SelectItem value="nationalId" text="National ID" />
              <SelectItem value="registrationId" text="Registration ID" />
              <SelectItem value="licenseNumber" text="License Number" />
              <SelectItem value="name" text="Name" />
            </Select>
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <TextInput
              id="searchValue"
              labelText="Search Value"
              placeholder="Enter search value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isSearching && handleSearch()}
              disabled={isSearching}
            />
          </div>

          <Button
            kind="primary"
            renderIcon={Search}
            onClick={handleSearch}
            disabled={isSearching || !searchValue.trim() || !locationUuid}
            style={{ minWidth: '120px' }}
          >
            {isSearching ? <InlineLoading description="Searching..." /> : 'Search'}
          </Button>

          <Button
            kind="secondary"
            renderIcon={UserMultiple}
            onClick={handleGetAllProviders}
            disabled={isLoadingProviders || !locationUuid}
            style={{ minWidth: '180px' }}
          >
            {isLoadingProviders ? <InlineLoading description="Loading..." /> : 'Get All Providers'}
          </Button>

          <Button
            kind="danger"
            onClick={handleReset}
            disabled={isSearching || isLoadingProviders}
            style={{ minWidth: '120px' }}
          >
            Reset
          </Button>
        </div>

        {/* Providers Table */}
        {providers.length > 0 && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Providers</h3>
              <Tag type="gray" size="sm">
                {providers.length}
              </Tag>
            </div>

            <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#e0e0e0' }}>
              <strong>Providers List</strong>
            </div>

            <DataTable rows={rows} headers={headers}>
              {({ rows, headers, getHeaderProps, getRowProps }) => (
                <TableContainer>
                  <Table size="md">
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader key={header.key} {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, idx) => {
                        const provider = providers[idx];
                        return (
                          <TableRow
                            key={row.id}
                            {...getRowProps({ row })}
                            style={{ backgroundColor: idx % 2 === 0 ? '#e8eaf6' : '#ffffff' }}
                          >
                            {row.cells.map((cell) => {
                              if (cell.info.header === 'actions') {
                                return (
                                  <TableCell key={cell.id}>
                                    <Button
                                      kind="tertiary"
                                      size="sm"
                                      onClick={() => handleViewDetails(provider)}
                                      disabled={isSearching}
                                      style={{
                                        backgroundColor: '#17a2b8',
                                        color: 'white',
                                        border: 'none',
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </TableCell>
                                );
                              }
                              return <TableCell key={cell.id}>{cell.value}</TableCell>;
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DataTable>
          </div>
        )}

        {/* Practitioner Details Modal */}
        <HealthWorkerModal
          isModalOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          selectedPractitioner={selectedPractitioner}
        />
      </Column>
    </Grid>
  );
}
