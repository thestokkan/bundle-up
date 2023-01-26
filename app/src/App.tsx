import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {ThemeContext} from "./theme";
import './theme/variables.css';
import {FaMoon, FaSun, FaTemperatureLow} from "react-icons/fa";
import {Button, Input, WeatherPlot, LoadingAnimation} from "./components";
import {BiLineChart} from "react-icons/bi";
import tomorrow from './tomorrow.png'
import yesterday from './yesterday.png'
import thermometer from './thermometer.png'
import {GoLocation} from "react-icons/go";
import {useDebouceValue} from './utils/hooks';
import BasicWeather from "./components/DisplayWeather/BasicWeatherData";
import { Recommendation } from './components/Recommandation';
import type { Day } from './components/Recommandation/Recommandation';

function App() {
    // Theme settings
    const themeContext = useContext(ThemeContext);
    const [themeIcon, setThemeIcon] = useState(<FaSun/>)
    const toggleTheme = () => {
        if (themeContext) {
            if (themeContext.theme === "dark") {
                themeContext.setTheme("light");
                setThemeIcon(<FaMoon/>);
            } else {
                themeContext.setTheme("dark");
                setThemeIcon(<FaSun/>);
            }
        }
    }

    // Toggle day button
    const [day, setDay] = useState("today");
    const [dayIcon, setDayIcon] = useState(<img src={tomorrow} width={28}/>);
    const toggleDay = () => {
        if (day === "today") {
            setDay("tomorrow");
            setDayIcon(<img src={yesterday} width={28}/>);
        } else {
            setDay("today");
            setDayIcon(<img src={tomorrow} width={28}/>);
        }
    }

    // Location settings

    const [geoLocationName, setGeoLocationName] = useState<string>("");
    const options: PositionOptions = {
        timeout: 10_000
    }

    function error(err: GeolocationPositionError) {
        setLocationName("Stavanger");
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function success(position: GeolocationPosition) {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=db698b5e650a441fae6190451221401&q=${position.coords.latitude},${position.coords.longitude}&days=1&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data => {
                setGeoLocationName(data.location.name);
                if (!locationName) setLocationName(data.location.name);
            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success,error,options)
    }, []);
    const [locationName, setLocationName] = useState("");
    const debounceLocationName = useDebouceValue(locationName, 500)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationName(event.target.value);
    };

    const updateLocationName = () => {
        setLocationName(locationName);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            updateLocationName();
        }
    };

    // Weather display button
    const [weatherDisplayIcon, setWeatherDisplayIcon] = useState(<BiLineChart/>);
    const [weatherDisplay, setWeatherDisplay] = useState("basic")
    const toggleWeatherDisplay = () => {
        if (weatherDisplay === "basic") {
            setWeatherDisplay("chart");
            setWeatherDisplayIcon(<img src={thermometer} width={28}/>);
        } else {
            setWeatherDisplay("basic");
            setWeatherDisplayIcon(<BiLineChart/>);
        }
    }

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const closeModal = () => setIsModalOpen(false);

    return (
        <div className="App">
            <header className="App-header">
                <div className="toggle-theme">
                    <Button onClick={() => {
                        toggleTheme()
                    }} type={"theme"} children={themeIcon}></Button>
                </div>
                <div className="app-logo">
                    <img className="logo-image" src="bundled-up.svg" alt="logo"/><h2
                    className="logo-text">VærKlar</h2>
                </div>
            </header>

            <div className="App-body">

                <div className="weather-container">
                    {weatherDisplay
                        && (((weatherDisplay === "chart") &&
                                (<WeatherPlot day={day} location={debounceLocationName}/>))
                            || ((weatherDisplay === "basic"
                                && (<BasicWeather day={day} location={debounceLocationName}/>))))
                        || <LoadingAnimation text={"Henter værdata..."}/>}
                </div>

                <Recommendation location={debounceLocationName} day={day as Day} classname={"recommendation"}/>

                <div className="bottom-row">

                    <div className="toggle-weather-display">
                        <Button onClick={() => {
                            toggleWeatherDisplay()
                        }} type={"round"} children={weatherDisplayIcon}></Button>
                    </div>

                    <div className="input-and-button">
                        <Input type="text"
                               className="input"
                            //    className="input connect-right"
                               placeholderText="Sted"
                               id="location"
                               onChange={handleChange}
                               onKeyDown={handleKeyDown}
                               value={locationName}
                        />
                    </div>
                    <div className="toggle-day">
                        <Button onClick={() => {
                            toggleDay()
                        }} type={"round"} children={dayIcon}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;