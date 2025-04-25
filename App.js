import React, { useState, useEffect } from 'react';
import { fetchDoctors } from './utils/api';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorCard from './components/DoctorCard';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationMode, setConsultationMode] = useState('');
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [allSpecialities, setAllSpecialities] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
        
        // Extract all unique specialities
        const specialities = new Set();
        data.forEach(doctor => {
          doctor.specialities.forEach(spec => {
            specialities.add(spec.name);
          });
        });
        setAllSpecialities(Array.from(specialities).sort());
        
        // Load filters from URL
        loadFiltersFromURL();
        setLoading(false);
      } catch (error) {
        console.error('Error loading doctors:', error);
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    // Apply filters whenever any filter changes
    applyFilters();
  }, [doctors, searchTerm, consultationMode, selectedSpecialities, sortOption]);

  const loadFiltersFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    
    // Search
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    // Consultation mode
    const modeParam = params.get('mode');
    if (modeParam && ['Video Consult', 'In Clinic'].includes(modeParam)) {
      setConsultationMode(modeParam);
    }
    
    // Specialities
    const specialitiesParam = params.get('specialities');
    if (specialitiesParam) {
      setSelectedSpecialities(specialitiesParam.split(','));
    }
    
    // Sort
    const sortParam = params.get('sort');
    if (sortParam && ['fees', 'experience'].includes(sortParam)) {
      setSortOption(sortParam);
    }
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (consultationMode) params.set('mode', consultationMode);
    if (selectedSpecialities.length > 0) params.set('specialities', selectedSpecialities.join(','));
    if (sortOption) params.set('sort', sortOption);
    
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const applyFilters = () => {
    let result = [...doctors];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply consultation mode filter
    if (consultationMode) {
      if (consultationMode === 'Video Consult') {
        result = result.filter(doctor => doctor.video_consult);
      } else if (consultationMode === 'In Clinic') {
        result = result.filter(doctor => doctor.in_clinic);
      }
    }

    // Apply speciality filter
    if (selectedSpecialities.length > 0) {
      result = result.filter(doctor =>
        doctor.specialities.some(spec =>
          selectedSpecialities.includes(spec.name))
      );
    }

    // Apply sorting
    if (sortOption === 'fees') {
      result.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^0-9]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^0-9]/g, ''));
        return feeA - feeB;
      });
    } else if (sortOption === 'experience') {
      result.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/[^0-9]/g, ''));
        const expB = parseInt(b.experience.replace(/[^0-9]/g, ''));
        return expB - expA;
      });
    }

    setFilteredDoctors(result);
    updateURL();
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleConsultationModeChange = (mode) => {
    setConsultationMode(prev => prev === mode ? '' : mode);
  };

  const handleSpecialityChange = (speciality) => {
    setSelectedSpecialities(prev =>
      prev.includes(speciality)
        ? prev.filter(s => s !== speciality)
        : [...prev, speciality]
    );
  };

  const handleSortChange = (option) => {
    setSortOption(prev => prev === option ? '' : option);
  };

  return (
    <div className="App">
      {/* App Header */}
      <header className="app-header">
        <div className="header-content">
          <a href="/" className="logo">
            <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            DocFinder
          </a>
        </div>
      </header>

      {/* Search Area */}
      <div className="search-wrapper">
        <div className="search-inner">
          <h2 className="search-header">Find the Best Doctors & Healthcare Specialists</h2>
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </div>
      </div>

      <div className="container">
        {/* Filter Panel */}
        <FilterPanel
          doctors={doctors}
          consultationMode={consultationMode}
          onConsultationModeChange={handleConsultationModeChange}
          specialities={allSpecialities}
          selectedSpecialities={selectedSpecialities}
          onSpecialityChange={handleSpecialityChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />

        {/* Doctor List Area */}
        <div className="doctor-list">
          {!loading && filteredDoctors.length > 0 && (
            <div className="results-info">
              <div className="results-count">
                Found {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading">
              <div className="loading-spinner">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>Loading doctors...</div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="no-doctors">
              <div className="no-doctors-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="no-doctors-text">No doctors found matching your criteria. Try adjusting your filters.</div>
            </div>
          ) : (
            filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;