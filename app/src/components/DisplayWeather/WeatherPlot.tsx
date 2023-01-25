import './DisplayWeather.css';
import {getDetailedWeatherData} from "../../fetchData";
import {useEffect, useState} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

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
         <ResponsiveContainer height={230} width="100%">

            <LineChart
                data={formattedWeatherData}
                margin={{
                    top: 35,
                    right: 5,
                    left: 0,
                    bottom: 5,
                }}
            >
                <title>{location} {day}</title>
                <CartesianGrid/>
                <XAxis dataKey="time" tickLine={false}/>
                <YAxis tickLine={false} label={{value: "℃", position: "insideLeft", dy: -95}}
                       axisLine={false} width={30}/>
                <Line id="temp" type="monotone" dataKey="temp" name="Temp" activeDot={{r: 6}}/>
                <Line id="appTemp" type="monotone" dataKey="appTemp" name="Føles som"/>
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined}/>}/>
                <Legend/>
            </LineChart>
        </ResponsiveContainer>
)
    ;

    return (
        <div className="weather-plot">
            {renderChart && renderChart || <p>Laster graf...</p>}
        </div>
    );
};

export default WeatherPlot;