import { useEffect, useState } from "react";
import styles from "./DayCard.module.css";
import { useWeather } from "../context/WeatherContext";

function DayCard({ day }) {
  const [timestamp, setTimestamp] = useState(day.dt);
  const [weekday, setWeekday] = useState();
  const [date, setDate] = useState();
  const { convertTemp } = useWeather();
  useEffect(() => {
    const convertTimestampToHumanReadable = () => {
      const date = new Date(timestamp * 1000);

      const weekDayOptions = {
        weekday: "short",
      };

      const dateOptions = {
        month: "numeric",
        day: "numeric",
      };

      setWeekday(date.toLocaleString("en-US", weekDayOptions));
      setDate(date.toLocaleString("en-US", dateOptions));
    };

    convertTimestampToHumanReadable();
  }, [timestamp]);

  return (
    <div className={styles.dayContainer}>
      <div className={styles.timeContainer}>
        <h2>{weekday}</h2>
        <h4>{date}</h4>
      </div>
      <span className={styles.temperatureContainer}>
        {" "}
        <h2>&nbsp;{convertTemp(day.temp.day)}&deg;</h2>
        <h5 className={styles.maxTemperature}>
          /{convertTemp(day.temp.max)}&deg;
        </h5>
      </span>
      <h4 className={styles.summary}>{day.summary}</h4>
    </div>
  );
}

export default DayCard;
