import './DisplayWeather.css';
import {getWeatherDataAndClothesCombo} from "../../fetchData";
import {useEffect, useState} from "react";
import {WeatherProps} from "./WeatherPlot";

const BasicWeather = ({day, location}: WeatherProps) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setData(await getWeatherDataAndClothesCombo(location));
        }

        fetchData();
    }, [day, location]);

    const [dailyData, setDailyData] = useState<any>();

    useEffect(() => {

        if (data) {
            let weatherData = data.weatherDataBasic;
            let dailyData = weatherData.today;
            if (day === "tomorrow") dailyData = weatherData.tomorrow;

            setDailyData(dailyData);
        }


    }, [data]); // Runs on first render and when data is updated


    return (
        <div className="basic-weather">
            {dailyData && dailyData.minTempDay || <p>Laster værdata....</p>}
        </div>
    );
};

export default BasicWeather;