import React, {useContext, useState} from 'react';
import './App.css';
import {ThemeContext} from "./theme";
import './theme/variables.css';
import {Button, Input, Link, Modal, Counter, Slider, WeatherPlot} from "./components";
import {FaBeer, FaBicycle, FaBookOpen, FaLongArrowAltRight, FaSun, FaMoon} from "react-icons/fa";
import {
  WiCloud,
  WiDayCloudy,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiRain,
  WiSleet,
  WiSnow,
  WiThunderstorm
} from "react-icons/wi";

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

  // Weather icons
  const [activeWeatherIcon, setActiveWeatherIcon] = useState("none");
  const activateIcon = () => {

  }

  // Connect input and button
  const [nameInput, setNameInput] = useState('');
  const [updatedName, setUpdatedName] = useState(nameInput);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const updateName = () => {
    // 👇 "message" stores input field value
    setUpdatedName(nameInput);
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
            <Button onClick={() => {toggleTheme()}} type={"theme"} children={themeIcon}></Button>
          </div>
          <img className="Bundled-up-logo" src="bundled-up.svg" alt="Bundled up kid"/>
          <h1>
              VærKlar
          </h1>

          <WeatherPlot/>

          <div className="temperature-setting">
            <h4>Dagens temperatur:</h4>
            <Counter></Counter>
            <div className="weather-icons">
              <Button
                  type="icon"
                  children={<WiDaySunny/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiDaySunnyOvercast/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiDayCloudy/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiCloud/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiRain/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiSleet/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiSnow/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiFog/>}
                  onClick={() => activateIcon()}
              />
              <Button
                  type="icon"
                  children={<WiThunderstorm/>}
                  onClick={() => activateIcon()}
              />
            </div>
          </div>
          <div className="input-and-button flex-row">
            <Input type="text"
                   className="connect-right"
                   placeholderText="What's your name?"
                   id="name"
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
                   value={nameInput}
            />
            <Button
                children=<FaLongArrowAltRight/>
                onClick={updateName}
                type="connect"
            />
          </div>

          <div className="hidden" id="welcome">
            <h3>{`Hello, ${updatedName}!`}</h3>
            <h4>What would you like to do?</h4>
            <div className="icon-buttons flex-row">
              <Button
                  type="icon"
                  children={<FaBeer/>}
                  onClick={() => {
                    setIsModalOpen((currentValue) => !currentValue);
                  }}
              />
              <Button
                  type="icon"
                  children={<FaBicycle/>}
                  onClick={() => {
                    setIsModalOpen((currentValue) => !currentValue);
                  }}
              />
              <Button
                  type="icon"
                  children={<FaBookOpen/>}
                  onClick={() => {
                    setIsModalOpen((currentValue) => !currentValue);
                  }}
              />
              <Modal title=""
                     isOpen={isModalOpen}
                     closeModal={() => {
                       setIsModalOpen(false);
                     }}
              >
                <h3>Wohoo, let's go!</h3>

              </Modal>
            </div>
          </div>
          <div id="slider">
            <Slider/>
          </div>

          <div className="link-list">
            <Link url="https://reactjs.org/" text="React"></Link>
          </div>
        </header>
      </div>
  );
}

export default App;