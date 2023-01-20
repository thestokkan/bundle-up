import './DisplayWeather.css';
import {getWeatherDataAndClothesCombo} from "../../fetchData";
import {useEffect, useState} from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

const WeatherPlot = () => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setWeatherData(await getWeatherDataAndClothesCombo());
        }

        fetchData();
    }, []);

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

    const renderLineChart = (
        <LineChart className="line-chart" data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );

    return (
        <div className="weather-plot">
            {renderLineChart}
        </div>
    );
};

export default WeatherPlot;