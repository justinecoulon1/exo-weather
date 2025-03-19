import { useCallback, useState } from "react";
import SearchBar from "../components/search-bar/search-bar.jsx";
import styles from './weather-container.module.css'
import SavedWeatherHistory from "../components/weather/saved-weather-history.jsx";
import CityWeather from "../components/weather/city-weather.jsx";

export default function WeatherContainer() {

    const [currentCity, setCurrentCity] = useState('');
    const [favorites, setFavorites] = useState([]);

    const handleCitySubmit = useCallback((city) => {
        setCurrentCity(city)
    }, [])

    const handleAddFavorite = useCallback((newFavorite) => {
        const favId = favorites.map(fav => fav.id);
        if (!favId.includes(newFavorite.id)) {
            setFavorites(favorites => [newFavorite, ...favorites])
        }
    }, [setFavorites, favorites]);

    const handleDeleteFavorite = useCallback((newFavorite) => {
        setFavorites(favorites => favorites.filter(fav => fav.id !== newFavorite.id))
    }, [setFavorites]);

    return (
        <>
            <div className={styles.dayWeather}>
                <h2>Météo du jour :</h2>
                <div className={styles.dayWeatherInnerContent}>
                    <SearchBar onSubmit={handleCitySubmit} placeholder={'Entrez une ville'} />
                    {currentCity && <CityWeather city={currentCity} onAddFavorite={handleAddFavorite} />}
                </div>
            </div>

            <div className={styles.history}>
                <SavedWeatherHistory favorites={favorites} onDeleteFavorite={handleDeleteFavorite} />
            </div>
        </>
    )
}