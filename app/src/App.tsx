import React, {useContext, useState} from 'react';
import './App.css';
import {ThemeContext} from "./theme";
import './theme/variables.css';
import {Button, Input, WeatherPlot} from "./components";
import {FaCalendarMinus, FaCalendarPlus, FaMoon, FaSun, FaTemperatureLow} from "react-icons/fa";
import {BiLineChart} from "react-icons/bi";
import {Clothes} from "./components/Clothes";
import { useDebouceValue } from './utils/hooks';
import BasicWeather from "./components/DisplayWeather/BasicWeatherData";

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
    const [dayIcon, setDayIcon] = useState(<FaCalendarPlus/>);
    const toggleDay = () => {
        if (day === "today") {
            setDay("tomorrow");
            setDayIcon(<FaCalendarMinus/>);
        } else {
            setDay("today");
            setDayIcon(<FaCalendarPlus/>);
        }
    }

    // Connect input field and button
    const [locationName, setLocationName] = useState('Oslo');
    const debounceLocationName=useDebouceValue(locationName,500)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationName(event.target.value);
    };

    const updateLocationName = () => {
        setLocationName(locationName);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log(event.key);

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
            setWeatherDisplayIcon(<FaTemperatureLow/>);
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

                <div className='weather-container'>
                    {weatherDisplay
                        && (((weatherDisplay === "chart") &&
                            (<WeatherPlot day={day} location={debounceLocationName}/>))
                            || ((weatherDisplay === "basic"
                                && <BasicWeather day={day} location={debounceLocationName}/>)))
                        || <p>Loading...</p>}
                </div>

                <div className="recommendation">
                    <img className="oscar" src="raingear.png" alt="rain"/>
                    <Clothes location={debounceLocationName} day={day}/>
                </div>

                <div className="bottom-row">

                    <div className="toggle-weather-display">
                        <Button onClick={() => {
                            toggleWeatherDisplay()
                        }} type={"icon"} children={weatherDisplayIcon}></Button>
                    </div>

                    <div className="input-and-button">
                        <Input type="text"
                               className="input"
                            // className="input connect-right"
                               placeholderText="Sted"
                               id="location"
                               onChange={handleChange}
                               onKeyDown={handleKeyDown}
                               value={locationName}
                        />

                        {/*<Button*/}
                        {/*    children=<FaLongArrowAltRight/>*/}
                        {/*    onClick={updateLocationName}*/}
                        {/*    type="connect"/>*/}
                    </div>
                    <div className="toggle-day">
                        <Button onClick={() => {
                            toggleDay()
                        }} type={"icon"} children={dayIcon}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;