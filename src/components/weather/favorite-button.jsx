import favorite from '/star.png'
import styles from './favorite-button.module.css'
import remove from '/clear.png'

export default function FavoriteButton({ type, onAction = () => { } }) {

    return (
        <button onClick={() => onAction(type)} className={styles.favoriteButton}>
            <img className={styles.favoriteImg} src={type === 'add' ? favorite : remove} alt="Favorite button" />
        </button>
    )
}