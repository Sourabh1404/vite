import React from 'react';
import icons from './assets/icon.png';
const CandidateCard = ({ candidate }) => (
  <div className="card ">
    <h2 className='fontnew text-2xl font-semibold'>{candidate.name}</h2>
    
    <div className="placeholder-icons">
      <div className="placeholder-icon">
        <img src={icons} alt="Placeholder Icon 1" />
        <p className='pl-2 fontnew'>{candidate.last_updated_at}</p>
      </div>
      <div className="placeholder-icon">
        <img src={icons} alt="Placeholder Icon 2" />
        <p className='pl-2 fontnew'>{candidate.location}</p>
      </div>
      <div className="placeholder-icon">
        <img src={icons} alt="Placeholder Icon 3" />
        <p className='pl-2 fontnew'>{candidate.gender}</p>
      </div>
    </div>
  </div>
);

export default CandidateCard;
