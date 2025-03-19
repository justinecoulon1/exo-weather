import { useCallback, useState } from "react";
import SearchBar from "../components/search-bar/search-bar.jsx";
import Weather from "../components/weather/weather.jsx";


export default function WeatherContainer() {

        const [currentCity, setCurrentCity] = useState('');

        const handleCitySubmit = useCallback((city) => {
                setCurrentCity(city)
        }, [])

        return (
                <div>
                        <SearchBar onSubmit={handleCitySubmit} placeholder={'Ville'} />
                        {currentCity && <Weather city={currentCity} />}
                </div>
        )
}