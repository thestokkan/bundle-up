import './DisplayWeather.css';
import {getDetailedWeatherData, getWeatherDataAndClothesCombo} from "../../fetchData";
import {useEffect, useState} from "react";
import {WeatherProps} from "./WeatherPlot";

const BasicWeather = ({day, location}: WeatherProps) => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setWeatherData(await getWeatherDataAndClothesCombo(location));
        }

        fetchData();
    }, [day, location]);


    return (
        <div className="basic-weather">
            <p>Basic weather info</p>
        </div>
    );
};

export default BasicWeather;