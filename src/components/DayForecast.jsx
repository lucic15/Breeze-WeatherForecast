import { useWeather } from "../context/WeatherContext";
import DayCard from "./DayCard";
import styles from "./DayForecast.module.css";

function DayForecast() {
  const { dailyData } = useWeather();
  const firstFiveDays = dailyData && dailyData.slice(0, 5);

  return (
    <div className={styles.dayCardContainer}>
      {firstFiveDays &&
        firstFiveDays.map((day, index) => <DayCard day={day} key={index} />)}
    </div>
  );
}

export default DayForecast;
