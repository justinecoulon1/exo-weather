import Weather from "./weather.jsx";
import styles from './saved-weather-history.module.css'

export default function SavedWeatherHistory({ favorites, onDeleteFavorite }) {

    return (
        <div className={styles.savedWeatherHistoryContainer}>
            <div className={styles.savedWeatherHistoryTitle}>
                <h2>Villes sauvegardées :</h2>
            </div>

            <div className={styles.savedWeatherHistoryInnerContent}>
                {favorites.map(f => <Weather key={f.id} weather={f} isFavorite={true} onRemoveFromFavorites={() => onDeleteFavorite(f)} />)}
            </div>
        </div>
    )
}