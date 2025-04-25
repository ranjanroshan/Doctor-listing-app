import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="doctor-photo">
        <img src={doctor.photo} alt={doctor.name} />
      </div>
      <div className="doctor-info">
        <h3 className="doctor-name" data-testid="doctor-name">{doctor.name}</h3>
        <div className="doctor-specialty" data-testid="doctor-specialty">
          {doctor.specialities.map((spec, index) => (
            <span key={index}>{spec.name}</span>
          ))}
        </div>
        <div className="doctor-intro">{doctor.doctor_introduction}</div>
        <div className="doctor-languages">
          <span>Languages:</span> {doctor.languages.join(', ')}
        </div>
        <div className="doctor-clinic">
          <strong>{doctor.clinic.name}</strong>
          {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
        </div>
      </div>
      <div className="doctor-meta">
        <div className="doctor-experience" data-testid="doctor-experience">
          {doctor.experience}
        </div>
        <div className="doctor-fee" data-testid="doctor-fee">
          {doctor.fees}
        </div>
        <div className="consultation-types">
          {doctor.video_consult && <span>Video Consult</span>}
          {doctor.in_clinic && <span>In Clinic</span>}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;