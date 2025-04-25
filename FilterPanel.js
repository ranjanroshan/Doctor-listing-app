import React from 'react';

const FilterPanel = ({
  consultationMode,
  onConsultationModeChange,
  specialities,
  selectedSpecialities,
  onSpecialityChange,
  sortOption,
  onSortChange
}) => {
  return (
    <div className="filter-panel">
         <div className="filter-section">
        <h3 className="filter-header">
          <svg className="filter-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 21V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 10V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 21V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 16H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sort By
        </h3>
        <div className="filter-options">
          <div className="filter-option">
            <input
              type="radio"
              id="sort-fees"
              name="sort"
              checked={sortOption === 'fees'}
              onChange={() => onSortChange('fees')}
            />
            <label htmlFor="sort-fees">Fees: Low to High</label>
          </div>
          <div className="filter-option">
            <input
              type="radio"
              id="sort-experience"
              name="sort"
              checked={sortOption === 'experience'}
              onChange={() => onSortChange('experience')}
            />
            <label htmlFor="sort-experience">Experience: High to Low</label>
          </div>
        </div>
      </div>
      <div className="filter-section">
        <h3 className="filter-header">
          <svg className="filter-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Consultation Mode
        </h3>
        <div className="filter-options">
          <div className="filter-option">
            <input
              type="checkbox"
              id="video-consult"
              checked={consultationMode === 'Video Consult'}
              onChange={() => onConsultationModeChange('Video Consult')}
            />
            <label htmlFor="video-consult">Video Consultation</label>
          </div>
          <div className="filter-option">
            <input
              type="checkbox"
              id="in-clinic"
              checked={consultationMode === 'In Clinic'}
              onChange={() => onConsultationModeChange('In Clinic')}
            />
            <label htmlFor="in-clinic">In-Clinic Visit</label>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-header">
          <svg className="filter-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Specialities
        </h3>
        <div className="filter-options specialities-list">
          {specialities.map((speciality, index) => (
            <div className="filter-option" key={index}>
              <input
                type="checkbox"
                id={`speciality-${index}`}
                checked={selectedSpecialities.includes(speciality)}
                onChange={() => onSpecialityChange(speciality)}
              />
              <label htmlFor={`speciality-${index}`}>{speciality}</label>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default FilterPanel;