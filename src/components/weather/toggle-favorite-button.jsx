import styles from './toggle-favorite-button.module.css'
import remove from '/clear.png'
import favorite from '/star.png'

export default function ToggleFavoriteButton({ isFavorite, onAddToFavorites = () => { }, onRemoveFromFavorites = () => { } }) {
    return (
        <button onClick={() => isFavorite ? onRemoveFromFavorites() : onAddToFavorites()} className={styles.favoriteButton}>
            <img className={styles.favoriteImg} src={isFavorite ? remove : favorite} alt="Favorite button" />
        </button>
    )
}