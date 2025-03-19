import styles from './weather.module.css'
import FavoriteButton from './favorite-button.jsx';
import { useCallback } from 'react';

export default function Weather({ type, weather, onHandleFavorite = () => { }, name }) {

    const onToggleFav = () => {
        onHandleFavorite(weather);
    };

    return (
        <div className={styles.weatherContainerDiv}>
            <FavoriteButton type={type} onAction={onToggleFav} />
            <h3 className={styles.weatherContainerTitle}>Météo à {weather.name} <img className={styles.weatherIcon} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" /></h3>

            <div className={styles.innerContent}>
                <p><span className={styles.boldText}>Météo :</span> {weather.weather[0].description}</p>
                <p><span className={styles.boldText}>Température :</span> {weather.main.temp}°C</p>
            </div>
        </div>
    )
}