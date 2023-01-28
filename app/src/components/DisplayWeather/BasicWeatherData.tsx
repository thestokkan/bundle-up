import './DisplayWeather.css';
import {getWeatherDataAndClothesCombo} from "../../fetchData";
import React, {useEffect, useState} from "react";
import {WeatherProps} from "./WeatherPlot";
import {
    WiCloud,
    WiDayCloudy,
    WiDaySnow,
    WiDaySunny,
    WiDaySunnyOvercast,
    WiFog,
    WiRain,
    WiRaindrop,
    WiShowers,
    WiSnow,
    WiSnowWind,
    WiSprinkle,
    WiStrongWind,
    WiThunderstorm
} from "react-icons/wi";
import {LoadingAnimation} from "../LoadingAnimation";

const BasicWeather = ({day, locationData}: WeatherProps) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setData(await getWeatherDataAndClothesCombo(locationData));
        }

        fetchData();
    }, [day, locationData.locationName, locationData.latitude]);

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
            case 0:
                return <WiDaySunny/>;
            case 1:
                return <WiDaySunnyOvercast/>;
            case 2:
                return <WiDayCloudy/>;
            case 3:
                return <WiCloud/>;
            case 45:
            case 48:
                return <WiFog/>;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
                return <WiSprinkle/>; //drizzle
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                return <WiRain/>;
            case 71:
                return <WiSnow/>; //light snow
            case 73:
                return <WiSnow/>;
            case 75:
                return <WiSnowWind/>; //heavy snow
            case 77:
                return <WiSnow/>; //snow grains
            case 80:
                return <WiShowers/>; //rain showers: slight
            case 81:
                return <WiShowers/>; //rain showers: moderate
            case 82:
                return <WiShowers/>; //rain showers: violent
            case 85:
                return <WiDaySnow/>; //slight snow showers
            case 86:
                return <WiDaySnow/>; // heavy snow showers
            case 95:
                return <WiThunderstorm/>;
            case 96:
            case 99:
                return <WiThunderstorm/>; //thunderstorm with hail
            default:
                return "";
        }
    }


    const renderWeatherData = (
        <div className="basic-weather">
            <div className={"inner-container temperatures"}>
                <div className={"main-temperature"}>
                    <h2>{dailyData && dailyData.minTempDay + "°" || <LoadingAnimation/>}</h2>
                    <p>Min. temp</p>
                </div>
                <div className={"apparent-temperature"}>
                    <h3>{dailyData && dailyData.minApparentTempDay + "°" ||
                        <LoadingAnimation/>}</h3>
                    <p>Føles som</p>
                </div>
            </div>

            <div className={"inner-container weather-symbol-container"}>
                <div className={"weather-symbol"}>
                    {dailyData && getWeatherIcon(dailyData.weatherCode)}
                    <div className={"wind-and-rain"}>
                        {dailyData && (
                            <div>
                                <WiStrongWind/>
                                <p>{dailyData.maxWindSpeedDay.toFixed(1)} m/s</p>
                            </div>)}
                        {dailyData && (dailyData.precipitationSumDay.toFixed(1) > 0 &&
                            <div>
                                <WiRaindrop/>
                                {<p>{dailyData.precipitationSumDay.toFixed(1)} mm</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={"basic-weather-container"}>
            <h4 className={"heading"}>{day === "today" && "I dag" || "I morgen"} 08 - 17</h4>
            {dailyData && renderWeatherData || (!locationData.locationName &&
                <LoadingAnimation text={"Søker etter posisjon..."} subText={"Aktiver stedsdata i nettleseren eller" +
                    " velg sted manuelt."}/>)
                || <LoadingAnimation text={"Henter værdata..."}/>}
                </div>
                );
            };

            export default BasicWeather;