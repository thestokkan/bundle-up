import './DisplayWeather.css';
import {getDetailedWeatherData} from "../../fetchData";
import {useEffect, useState} from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from 'recharts';

const WeatherPlot = () => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setWeatherData(await getDetailedWeatherData("Oslo"));
        }

        fetchData();
    }, []); // Runs every time this component (re)renders


    const [formattedWeatherData, setFormattedWeatherData] = useState<any>();

    useEffect(() => {
        if (weatherData) {
            const today = [];

            for (let i = 0; i < weatherData.today.time.length; i++) {
                today.push({time: weatherData.today.time[i], temperature: weatherData.today.temperature[i]});
            }

            setFormattedWeatherData(today);
        }


    }, [weatherData]); // Runs on first render and when weatherData is updated


    const renderLineChart = (
        <LineChart className="line-chart" width={320} height={200} data={formattedWeatherData} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
            <Line type="monotone" dataKey="temperature" stroke="#8884d8"/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="time"/>
            <YAxis/>
        </LineChart>
    );

    return (
        <div className="weather-plot">
            {renderLineChart}
        </div>
    );
};

export default WeatherPlot;