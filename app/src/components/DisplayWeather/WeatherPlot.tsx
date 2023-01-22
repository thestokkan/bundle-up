import './DisplayWeather.css';
import {getDetailedWeatherData} from "../../fetchData";
import {useEffect, useState} from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

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
                const timeHours = new Date(data.time[i]).getHours().toString().padStart(2, '0');

                dailyData.push({
                    time: timeHours,
                    temp: data.temperature[i],
                    appTemp: data.apparentTemperature[i]
                });
            }

            setFormattedWeatherData(dailyData);
        }


    }, [weatherData]); // Runs on first render and when weatherData is updated

    // @ts-ignore
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label" id="time">{`${payload[0].payload.time}:00`}</p>
                    <p className="label" id="temp">{`${payload[0].value} ℃`}</p>
                    <p className="label" id="apparent-temp">{`${payload[1].value} ℃`}</p>
                </div>
            );
        }

        return null;
    };

    const renderChart = (
        <LineChart
            width={480}
            height={250}
            data={formattedWeatherData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <title>{location} {day}</title>
            <CartesianGrid />
            <XAxis dataKey="time" tickLine={false}/>
            <YAxis tickLine={false} label={{ value: "℃", position: "insideLeft", dy: -10}}
                   axisLine={false}/>
            <Line type="monotone" dataKey="temp" name="temperatur" stroke="#82ca9d" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="appTemp" name="Føles som" stroke="#8884d8"/>
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />}/>
            <Legend overflow="unset" />
        </LineChart>

    );

    return (
        <div className="weather-plot">
            {renderChart}
        </div>
    );
};

export default WeatherPlot;