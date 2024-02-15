import { useWeather } from "../context/WeatherContext";

function DayForecast() {
  const { dailyData } = useWeather();
  const firstFiveDays = dailyData && dailyData.slice(0, 5);

  return (
    <div>{firstFiveDays && firstFiveDays.map((day) => <h1>{day.dt}</h1>)}</div>
  );
}

export default DayForecast;
