import { useCallback, useState } from 'react';
import styles from './search-bar.module.css';
import loupe from '/loupe.png';

export default function SearchBar({ onSubmit = () => { }, placeholder }) {

    const [text, setText] = useState('');

    const onFormSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit(text);
        setText('')
    })

    return (
        <form className={styles.form} onSubmit={onFormSubmit}>
            <TextInput placeholder={placeholder} text={text} onTextChange={setText} />
            <button type="submit"> <img className={styles.searchBarImage} src={loupe} alt="search" /></button>
        </form>
    )
}

function TextInput({ placeholder, text, onTextChange }) {
    return <input type="text" placeholder={placeholder} value={text} onChange={(e) => onTextChange(e.target.value)} />
}