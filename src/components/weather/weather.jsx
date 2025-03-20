import ToggleFavoriteButton from './toggle-favorite-button.jsx';
import styles from './weather.module.css';

export default function Weather({ isFavorite, weather, onAddToFavorites = () => { }, onRemoveFromFavorites = () => { } }) {
    return (
        <div className={styles.weatherContainerDiv}>
            <ToggleFavoriteButton
                isFavorite={isFavorite}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
            />
            <h3 className={styles.weatherContainerTitle}>Météo à {weather.name} <img className={styles.weatherIcon} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" /></h3>

            <div className={styles.innerContent}>
                <p><span className={styles.boldText}>Météo :</span> {weather.weather[0].description}</p>
                <p><span className={styles.boldText}>Température :</span> {weather.main.temp}°C</p>
            </div>
        </div>
    )
}