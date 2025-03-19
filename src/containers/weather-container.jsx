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

    const handleToggleFavorite = (newFavorite, type) => {
        console.log('handle fav')
        if (type === 'delete') {
            console.log('delete')
            const updatedFavorites = favorites.filter(fav => fav.name !== newFavorite.name);
            setFavorites([...updatedFavorites])
        } else if (type === 'add') {
            if (!favorites.includes(newFavorite)) {
                console.log('add')

                setFavorites([newFavorite, ...favorites])
            }
        }
    }

    return (
        <>
            <div className={styles.dayWeather}>
                <h2>Météo du jour :</h2>
                <div className={styles.dayWeatherInnerContent}>
                    <SearchBar onSubmit={handleCitySubmit} placeholder={'Entrez une ville'} />
                    {currentCity && <CityWeather city={currentCity} onAddFavorite={handleToggleFavorite} />}
                </div>
            </div>

            <div className={styles.history}>
                <SavedWeatherHistory favorites={favorites} onDeleteFavorite={handleToggleFavorite} />
            </div>
        </>
    )
}