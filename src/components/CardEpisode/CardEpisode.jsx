import React from 'react';
import './CardEpisode.css';

const CardEpisode = ({ data }) => {
  return (
    <div className='card-episode'>
      <img
        src={`https://cdn.thesimpsonsapi.com/200${data.image_path}`}
        alt={data.name}
        className='episode-image'
        onError={(e) => e.target.src = '/fallback-episode.jpg'}
      />
      <h2>{data.name}</h2>
      <p><strong>Temporada:</strong> {data.season}</p>
      <p><strong>Número de episodio:</strong> {data.episode_number}</p>
      <p><strong>Fecha de emisión:</strong> {data.airdate || 'No disponible'}</p>
    </div>
  );
};

export default CardEpisode;