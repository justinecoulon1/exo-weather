import { useCallback, useState } from "react";
import SearchBar from "../components/search-bar/search-bar.jsx";
import CityWeather from "../components/weather/city-weather.jsx";
import SavedWeatherHistory from "../components/weather/saved-weather-history.jsx";
import styles from './weather-container.module.css';

export default function WeatherContainer() {

    const [currentCity, setCurrentCity] = useState('');
    const [favorites, setFavorites] = useState([]);

    const handleCitySubmit = useCallback((city) => {
        setCurrentCity(() => city)
    }, [])

    const handleAddFavorite = useCallback((newFavorite) => {
        console.log(newFavorite)
        const favId = favorites.map(fav => fav.id);
        if (!favId.includes(newFavorite.id)) {
            setFavorites(previousFavorites => [newFavorite, ...previousFavorites])
        }
    }, [favorites]);

    const handleDeleteFavorite = useCallback((toRemoveCity) => {
        setFavorites(previousFavorites => previousFavorites.filter(fav => fav.id !== toRemoveCity.id))
    }, []);

    return (
        <>
            <div className={styles.dayWeather}>
                <h2>Météo du jour :</h2>
                <div className={styles.dayWeatherInnerContent}>
                    <SearchBar onSubmit={handleCitySubmit} placeholder={'Entrez une ville'} />
                    {currentCity && <CityWeather
                        favorites={favorites}
                        city={currentCity}
                        onAddFavorite={handleAddFavorite}
                        handleDeleteFavorite={handleDeleteFavorite}
                    />}
                </div>
            </div>

            <div className={styles.history}>
                <SavedWeatherHistory favorites={favorites} onDeleteFavorite={handleDeleteFavorite} />
            </div>
        </>
    )
}