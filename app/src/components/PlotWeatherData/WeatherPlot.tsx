// import './WeatherPlot.css';
import {getWeatherData} from "../../fetchData";
import {useEffect, useState} from "react";

const WeatherPlot = () => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setWeatherData(await getWeatherData());
        }

        fetchData();
    }, []);

    return (
        <div className="weather-plot">
            {JSON.stringify(weatherData)}
        </div>
    );
};

export default WeatherPlot;