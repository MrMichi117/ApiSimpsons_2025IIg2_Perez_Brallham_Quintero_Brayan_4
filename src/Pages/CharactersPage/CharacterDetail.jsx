import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./CharacterDetail.css";

const CharacterDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lastPage = localStorage.getItem("lastCharacterPage") || 1;
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const delayToShow = setTimeout(() => setShowLoader(true), 50); // activa loader tras 50ms
        const minimumDisplay = 600;
        const startTime = Date.now();

        fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
            .then((res) => res.json())
            .then((data) => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, minimumDisplay - elapsed);

                setCharacter(data);

                setTimeout(() => {
                    setLoading(false);
                    setShowLoader(false);
                }, remaining);

                clearTimeout(delayToShow);
            })
            .catch((error) => {
                console.error("Error al cargar personaje:", error);
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, minimumDisplay - elapsed);

                setTimeout(() => {
                    setLoading(false);
                    setShowLoader(false);
                }, remaining);

                clearTimeout(delayToShow);
            });
    }, [id]);

    if (loading && showLoader) return <Loader />;
    if (!character)
        return <p className="character-error">Personaje no encontrado.</p>;

    return (
        <div className="character-detail-container">
            <h2 className="character-name">{character.name}</h2>

            <img
                src={`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`}
                alt={character.name}
                className="character-img"
            />

            <div className="character-info">
                <p>
                    <strong>Ocupación:</strong> {character.occupation}
                </p>
                <p>
                    <strong>Estado:</strong> {character.status}
                </p>
                <p>
                    <strong>Frase célebre:</strong>{" "}
                    {character.phrases?.[0] || "No disponible"}
                </p>
            </div>

            <button
                className="back-button"
                onClick={() => navigate(`/personajes?page=${lastPage}`)}
            >
                ← Volver a la página {lastPage}
            </button>
        </div>
    );
};

export default CharacterDetail;