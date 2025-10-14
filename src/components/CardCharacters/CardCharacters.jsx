import React from 'react';
import './CardCharacters.css';
import { Link } from 'react-router-dom';

const CardCharacters = ({ data, currentPage }) => {
  const handleClick = () => {
    localStorage.setItem('lastCharacterPage', currentPage);
  };

  return (
    <div className='card-character'>
      <img src={`https://cdn.thesimpsonsapi.com/500${data.portrait_path}`} alt={data.name} />
      <h2>{data.name}</h2>
      <p><strong>Ocupación:</strong> {data.occupation}</p>

      <Link to={`/personaje/${data.id}`} onClick={handleClick} className='details-button'>
        Ver detalles
      </Link>
    </div>
  );
};

export default CardCharacters;