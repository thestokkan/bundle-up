import React, {useContext, useState} from 'react';
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
    const [day, setDay] = useState("DAG1")
    const toggleDay = () => {
        if (day === "DAG2") {
            setDay("DAG1");
        } else {
            setDay("DAG2");
        }
    }

    // Connect input field and button
    const [fieldInput, setFieldInput] = useState('Oslo');
    const [updatedName, setUpdatedName] = useState(fieldInput);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldInput(event.target.value);
    };

    const updateName = () => {
        setUpdatedName(fieldInput);
        const welcome = document.getElementById("welcome");
        if (welcome) welcome.className = "";
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log(event.key);

        if (event.key === 'Enter') {
            event.preventDefault();
            updateName();
        }
    };

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

                {/*Use Conditional rendering to display either basic data or plot*/}
                <WeatherPlot/>

                <div className="recommendation">
                    <img className="oscar" src="raingear.png" alt="rain"/>
                    <div>
                        <Clothes/>
                    </div>
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
                               value={fieldInput}
                        />

                        <Button
                            children=<FaLongArrowAltRight/>
                            onClick={updateName}
                            type="connect"/>
                    </div>
                    <div className="toggle-day bottom-right">
                        <Button onClick={() => {
                            toggleDay()
                        }} type={"icon"} children={day}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;