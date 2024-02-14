import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import styles from "./HourCard.module.css";
function HourCard({ hour, index }) {
  const [timestamp, setTimestamp] = useState(hour.dt);
  const { convertTemp } = useWeather();
  const [humanReadableTime, setHumanReadableTime] = useState();
  useEffect(() => {
    const convertTimestampToHumanReadable = () => {
      const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        // Don't display seconds with leading zeros
        timeZone: "CET", // Set to Central European Time
      };

      setHumanReadableTime(date.toLocaleString("en-US", options));

      console.log("CET Time:", humanReadableTime);
    };

    convertTimestampToHumanReadable();
  }, [timestamp]);

  return (
    <div key={index} className={styles.card}>
      <p>{humanReadableTime}</p>
      <p>{convertTemp(hour.temp)}&deg;</p>
      {hour.weather && hour.weather[0] && (
        <img
          src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
          alt="Weather Icon"
        />
      )}
    </div>
  );
}

export default HourCard;
