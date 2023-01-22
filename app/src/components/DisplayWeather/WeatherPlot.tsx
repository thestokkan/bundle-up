import './DisplayWeather.css';
import {getDetailedWeatherData} from "../../fetchData";
import {useEffect, useState} from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from 'recharts';

export type WeatherPlotProps = {
    day: string;
    location: string;
}

const WeatherPlot = ({day, location}: WeatherPlotProps) => {
    const [weatherData, setWeatherData] = useState<any>(null);

    console.log(getDetailedWeatherData(location))

    useEffect(() => {
        async function fetchData() {
            setWeatherData(await getDetailedWeatherData(location));
        }

        fetchData();
    }, [day, location]); // Runs every time this component (re)renders


    const [formattedWeatherData, setFormattedWeatherData] = useState<any>();

    useEffect(() => {

        if (weatherData) {
            let data = weatherData.today;
            if (day === "tomorrow") data = weatherData.tomorrow;
            const dailyData = [];

            for (let i = 0; i < data.time.length; i++) {
                dailyData.push({time: data.time[i], temperature: data.temperature[i]});
            }

            setFormattedWeatherData(dailyData);
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