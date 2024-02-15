import React, { useEffect, useState } from "react";
import CityOverview from "./CityOverview";
import HourlyForecast from "./HourlyForecast";
import styles from "./Overview.module.css";
import Map from "./Map";
import DayForecast from "./DayForecast";

const API_URL =
  "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=";
const API_KEY = "eaa3da3a6a72d6e09221b5f51b582cd6";

function Overview() {
  return (
    <div className={styles.main}>
      <div className={styles.leftSideContainer}>
        <div className={styles.mainForecast}>
          <CityOverview />
          <HourlyForecast />
        </div>
        <DayForecast />
      </div>
      <Map />
    </div>
  );
}

export default Overview;
