import React from 'react';
import './CardLocation.css';

const CardLocation = ({ data }) => {
  return (
    <div className='card-location'>
      <img
        src={`https://cdn.thesimpsonsapi.com/500${data.image_path}`}
        alt={data.name}
        className='location-image'
        onError={(e) => e.target.src = '/fallback-location.jpg'}
      />
      <h2>{data.name}</h2>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Ciudad:</strong> {data.town || 'Springfield'}</p>
      <p><strong>Uso:</strong> {data.use || 'Sin especificar'}</p>
    </div>
  );
};

export default CardLocation;