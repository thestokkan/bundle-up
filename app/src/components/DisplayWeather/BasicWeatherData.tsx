import './DisplayWeather.css';
import {getWeatherDataAndClothesCombo} from "../../fetchData";
import {useEffect, useState} from "react";
import {WeatherProps} from "./WeatherPlot";
import {
    WiDaySunny,
    WiDaySunnyOvercast,
    WiDayCloudy,
    WiCloud,
    WiFog,
    WiRain,
    WiSleet,
    WiThunderstorm, WiShowers, WiSnow, WiHail, WiSprinkle, WiSnowWind, WiDaySnow, WiDaySprinkle, WiDayShowers
} from "react-icons/wi";

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

    function getWeatherIcon(code: number) {
        switch (code) {
            case 0: return <WiDaySunny/>;
            case 1: return <WiDaySunnyOvercast/>;
            case 2: return <WiDayCloudy/>;
            case 3: return <WiCloud/>;
            case 45:
            case 48: return <WiFog/>;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57: return <WiSprinkle/>; //drizzle
            case 61:
            case 63:
            case 65:
            case 66:
            case 67: return <WiRain/>;
            case 71: return <WiSnow/>; //light snow
            case 73: return <WiSnow/>;
            case 75: return <WiSnowWind/>; //heavy snow
            case 77: return <WiSnow/>; //snow grains
            case 80: return <WiShowers/>; //rain showers: slight
            case 81: return <WiShowers/>; //rain showers: moderate
            case 82: return <WiShowers/>; //rain showers: violent
            case 85: return <WiDaySnow/>; //slight snow showers
            case 86: return <WiDaySnow/>; // heavy snow showers
            case 95: return <WiThunderstorm/>;
            case 96:
            case 99: return <WiThunderstorm/>; //thunderstorm with hail
            default: return "";
        }
    }


    const renderWeatherData = (
        <div className="basic-weather">
            <div className={"temperatures"}>
                <div className={"main-temperature"}>
                    <h2>{dailyData && dailyData.minTempDay + "℃" || <p>Laster...</p>}</h2>
                    <p>Min. temp</p>
                </div>
                <div className={"apparent-temperature"}>
                    <h3>{dailyData && dailyData.minApparentTempDay + "℃" || <p>Laster...</p>}</h3>
                    <p>Føles som</p>
                </div>
            </div>

            <div className={"weather-symbol"}>
                {dailyData && getWeatherIcon(dailyData.weatherCode)}
            </div>
        </div>
    );

    return (
        <div className={"basic-weather-container"}>
            <h4>08:00 - 17:00</h4>
            {dailyData && renderWeatherData || <p>Laster værdata...</p>}
        </div>
    );
};

export default BasicWeather;