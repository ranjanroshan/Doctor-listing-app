import React from 'react';

const SpecialityFilter = ({ specialities, selectedSpecialities, onSpecialityChange }) => {
  return (
    <div className="filter-section">
      <div className="filter-header" data-testid="filter-header-speciality">Speciality</div>
      {specialities.map((speciality) => (
        <div key={speciality} className="filter-option">
          <input
            type="checkbox"
            id={`filter-specialty-${speciality.replace(/\s+/g, '-').replace(/\//g, '-')}`}
            checked={selectedSpecialities.includes(speciality)}
            onChange={() => onSpecialityChange(speciality)}
            data-testid={`filter-specialty-${speciality.replace(/\s+/g, '-').replace(/\//g, '-')}`}
          />
          <label htmlFor={`filter-specialty-${speciality.replace(/\s+/g, '-').replace(/\//g, '-')}`}>
            {speciality}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SpecialityFilter;