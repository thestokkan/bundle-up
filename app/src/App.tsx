import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {ThemeContext} from "./theme";
import './theme/variables.css';
import {Button, Input, WeatherPlot} from "./components";
import {FaLongArrowAltRight, FaMoon, FaSun, FaTemperatureLow} from "react-icons/fa";
import {BiLineChart} from "react-icons/bi";
import {Clothes} from "./components/Clothes";

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

    // Weather display button
    const [weatherDisplayIcon, setWeatherDisplayIcon] = useState(<BiLineChart/>)
    const toggleWeatherDisplay = () => {
        if (weatherDisplayIcon === <BiLineChart/>) {
            setWeatherDisplayIcon(<FaTemperatureLow/>);
        } else {
            setWeatherDisplayIcon(<BiLineChart/>);
        }
    }

    // Toggle day button
    const [day, setDay] = useState("today");
    const [dayIcon, setDayIcon] = useState("I MORGEN");
    const toggleDay = () => {
        if (day === "today") {
            setDay("tomorrow");
            console.log("day updated: " + day);
            setDayIcon("I DAG");
        } else {
            setDay("today");
            setDayIcon("I MORGEN");
        }
    }

    // useEffect(() => {
    //
    // }, [day]);

    // Connect input field and button
    const [locationName, setLocationName] = useState('Oslo');
    const [updatedLocationName, setUpdatedLocationName] = useState(locationName);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationName(event.target.value);
    };

    const updateLocationName = () => {
        setUpdatedLocationName(locationName);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log(event.key);

        if (event.key === 'Enter') {
            event.preventDefault();
            updateLocationName();
        }
    };

    // useEffect(() => {
    //
    //         updateLocationName();
    //
    // }, [locationName]);


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

                <div>
                    <WeatherPlot
                        day={day}
                        location={locationName}
                    />
                </div>

                <div className="recommendation">
                    <img className="oscar" src="raingear.png" alt="rain"/>
                    <Clothes/>
                </div>

                <div className="bottom-row flex-row">

                    <div className="toggle-weather-display bottom-left">
                        <Button onClick={() => {
                            toggleWeatherDisplay()
                        }} type={"icon"} children={weatherDisplayIcon}></Button>
                    </div>

                    <div className="input-and-button">
                        <Input type="text"
                               className="connect-right"
                               placeholderText="Sted"
                               id="location"
                               onChange={handleChange}
                               onKeyDown={handleKeyDown}
                               value={locationName}
                        />

                        <Button
                            children=<FaLongArrowAltRight/>
                            onClick={updateLocationName}
                            type="connect"/>
                    </div>
                    <div className="toggle-day bottom-right">
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