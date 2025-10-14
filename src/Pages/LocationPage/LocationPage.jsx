import React, { useEffect, useState } from 'react';
import CardLocation from '../../components/CardLocation/CardLocation';
import Loader from '../../components/Loader/Loader';
import './LocationPage.css';

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const delayToShow = setTimeout(() => setShowLoader(true), 50); // activa loader tras 50ms
    const minimumDisplay = 600;
    const startTime = Date.now();

    const urls = [
      'https://thesimpsonsapi.com/api/locations?page=1',
      'https://thesimpsonsapi.com/api/locations?page=2',
      'https://thesimpsonsapi.com/api/locations?page=3'
    ];

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(results => {
        const combined = results.flatMap(res => res.results || []);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumDisplay - elapsed);

        setLocations(combined);

        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remaining);

        clearTimeout(delayToShow);
      })
      .catch(error => {
        console.error('Error al cargar lugares:', error);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumDisplay - elapsed);

        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remaining);

        clearTimeout(delayToShow);
      });
  }, []);

  return (
    <div className="location-page">
      <h2 className="location-title">Lugares de Springfield</h2>

      {loading && showLoader ? (
        <Loader />
      ) : (
        <div className="location-grid">
          {locations.map(location => (
            <CardLocation key={location.id} data={location} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationPage;