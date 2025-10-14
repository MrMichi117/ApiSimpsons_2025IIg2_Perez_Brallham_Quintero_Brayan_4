import React, { useEffect, useState } from 'react';
import CardEpisode from '../../components/CardEpisode/CardEpisode';
import Loader from '../../components/Loader/Loader';
import './EpisodiesPage.css';

const EpisodiesPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayToShow = setTimeout(() => setShowLoader(true), 50); // activa loader tras 50ms
    const minimumDisplay = 600;
    const startTime = Date.now();

    const urls = Array.from({ length: 25 }, (_, i) =>
      `https://thesimpsonsapi.com/api/episodes?page=${i + 1}`
    );

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(results => {
        const combined = results.flatMap(res => res.results || []);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumDisplay - elapsed);

        setEpisodes(combined);

        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remaining);

        clearTimeout(delayToShow);
      })
      .catch(error => {
        console.error('Error al cargar episodios:', error);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumDisplay - elapsed);

        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remaining);

        clearTimeout(delayToShow);
      });
  }, []);

  const filteredEpisodes = episodes
    .filter(ep => ep.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(ep => selectedSeason === 'Todas' || ep.season === parseInt(selectedSeason));

  const seasonOptions = [...new Set(episodes.map(ep => ep.season))].sort((a, b) => a - b);

  return (
    <div className="episodes-page">
      <h2 className="episodes-title">Episodios de Los Simpsons</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar episodio por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="season-filter">
        <label htmlFor="season-select"><strong>Filtrar por temporada:</strong></label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {seasonOptions.map(season => (
            <option key={season} value={season}>Temporada {season}</option>
          ))}
        </select>
      </div>

      {loading && showLoader ? (
        <Loader />
      ) : (
        <div className="episodes-wrapper">
        <div className="episodes-grid">
          {filteredEpisodes.map((episode) => (
            <CardEpisode key={episode.id} data={episode} />
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default EpisodiesPage;