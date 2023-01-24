import './DisplayWeather.css';
import {getDetailedWeatherData} from "../../fetchData";
import {useEffect, useState} from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

export type WeatherProps = {
    day: string;
    location: string;
}

const WeatherPlot = ({day, location}: WeatherProps) => {
    const [weatherData, setWeatherData] = useState<any>(null);

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
    const CustomTooltip = ({active, payload, label}) => {
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
            width={450}
            height={230}
            data={formattedWeatherData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <title>{location} {day}</title>
            <CartesianGrid/>
            <XAxis dataKey="time" tickLine={false}/>
            <YAxis tickLine={false} label={{value: "℃", position: "insideLeft", dy: -10}}
                   axisLine={false}/>
            <Line id="temp" type="monotone" dataKey="temp" name="Temperatur" activeDot={{r: 6}}/>
            <Line id="appTemp" type="monotone" dataKey="appTemp" name="Føles som"/>
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined}/>}/>
            <Legend/>
        </LineChart>
    );

    return (
        <div className="weather-plot">
            <h4 className={"heading"}>{day === "today" && "I dag" || "I morgen"}</h4>
            {renderChart && renderChart || <p>Laster graf...</p>}
        </div>
    );
};

export default WeatherPlot;