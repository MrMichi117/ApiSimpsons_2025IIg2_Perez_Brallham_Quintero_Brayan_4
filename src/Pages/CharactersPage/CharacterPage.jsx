import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardCharacters from '../../components/CardCharacters/CardCharacters';
import Loader from '../../components/Loader/Loader';
import './CharacterPage.css';

const CharactersPage = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState('');
  const charactersPerPage = 10;

  useEffect(() => {
    const delayToShow = setTimeout(() => setShowLoader(true), 50); // activa loader tras 50ms
    const minimumDisplay = 600;
    const startTime = Date.now();

    const urls = Array.from({ length: 10 }, (_, i) =>
      `https://thesimpsonsapi.com/api/characters?page=${i + 1}`
    );

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(results => {
        const combined = results.flatMap(res => res.results || []);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumDisplay - elapsed);

        setAllCharacters(combined);

        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remaining);

        clearTimeout(delayToShow);
      })
      .catch(error => {
        console.error('Error al cargar personajes:', error);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumDisplay - elapsed);

        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remaining);

        clearTimeout(delayToShow);
      });
  }, []);

  const filteredCharacters = allCharacters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * charactersPerPage;
  const indexOfFirst = indexOfLast - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  return (
    <div className="characters-page">
      <h2 className="characters-title">Personajes de Los Simpsons</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar personaje por nombre..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && showLoader ? (
        <Loader />
      ) : (
        <>
          <div className="characters-grid">
            {currentCharacters.map((character) => (
              <CardCharacters key={character.id} data={character} currentPage={currentPage} />
            ))}
          </div>

          <div className="characters-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={i + 1 === currentPage ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CharactersPage;