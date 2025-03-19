import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "./weather.jsx";

export default function CityWeather({ city, onAddFavorite }) {

    const [isLoading, setIsLoading] = useState(false);
    const [onError, setError] = useState(false);
    const [weather, setWeather] = useState(null);
    const [name, setName] = useState('');
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const BASE_URL = 'https://api.openweathermap.org/';
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    useEffect(() => {
        //! Effect (Requete)
        //? Necessaire pour gérer le cleanup 
        //? (-> Effet de bord avec le Mode Strict)
        let ignore = false;
        const controller = new AbortController();

        //? Modification du state
        setIsLoading(true);
        setLat(null);
        setLon(null);
        setError(false);
        setName('');

        (async () => {
            try {
                const geoResponse = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
                    signal: controller.signal,
                    params: { q: city, limit: 1, appid: API_KEY, units: "metric", lang: 'fr' },
                });

                if (ignore || geoResponse.data.length === 0) {
                    setError(true);
                    setIsLoading(false);
                    return;
                }

                const { lat, lon } = geoResponse.data[0];
                setLat(lat);
                setLon(lon);
                setName(geoResponse.data[0].local_names.fr ?? geoResponse.data[0].name)
                onCityFound(name);

            } catch (error) {

                if (!ignore) {
                    setError(true);
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, [city, API_KEY]);

    useEffect(() => {
        if (!lat || !lon) return;

        setWeather(null);
        setIsLoading(true);
        setError(false);

        let ignore = false;
        const controller = new AbortController();

        (async () => {
            try {
                const weatherResponse = await axios.get(`${BASE_URL}/data/2.5/weather`, {
                    signal: controller.signal,
                    params: { lat, lon, appid: API_KEY, units: "metric", lang: 'fr' },
                });

                if (!ignore) {
                    setWeather(weatherResponse.data);
                    setIsLoading(false);
                }

                if (weatherResponse.data.length === 0) {
                    setError(true);
                    setIsLoading(false);
                    return;
                }

            } catch (error) {
                if (!ignore) {
                    setError(true);
                    setIsLoading(false);
                }
            }
        })();
        return () => {
            //! Cleanup
            ignore = true;
            controller.abort();
        };
    }, [lat, lon, API_KEY]);
    return (
        <div>
            {
                isLoading ?
                    <p>Chargement...</p>
                    : onError ?
                        <p>Une erreur s'est produite</p>
                        : (!!weather) && <Weather weather={weather} onHandleFavorite={onAddFavorite} type={'add'} name={name} />
            }
        </div>
    );
}