import './DisplayWeather.css';
import {getWeatherDataAndClothesCombo} from "../../fetchData";
import {useEffect, useState} from "react";
import {WeatherProps} from "./WeatherPlot";
import {WiDaySunny} from "react-icons/wi";

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

    const renderWeatherData = (
        <div className="basic-weather">
            <div className={"temperatures"}>
                <div className={"main-temperature"}>
                    <h1>{dailyData && dailyData.minTempDay  || <p>Laster...</p>}</h1>
                    <p>Min. temp mellom 8 og 17</p>
                </div>
                <div className={"apparent-temperature"}>
                    <h3>{dailyData && dailyData.minApparentTempDay || <p>Laster...</p>}</h3>
                    <p>Føles som</p>
                </div>
            </div>

            <div className={"weather-symbol"}>
                <WiDaySunny/>
            </div>
        </div>
    );

    return (
        <div className={"basic-weather-container"}>
            {dailyData && renderWeatherData || <p>Laster værdata...</p>}
        </div>
    );
};

export default BasicWeather;