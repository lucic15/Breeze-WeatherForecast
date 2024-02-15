import React, { useState, useRef } from "react";
import { useWeather } from "../context/WeatherContext";
import HourCard from "./HourCard";
import styles from "./HourlyForecast.module.css";
function HourlyForecast() {
  const { hourlyData } = useWeather();
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialX(e.clientX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - initialX;
    scrollContainerRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleSelectStart = (e) => {
    e.preventDefault();
  };
  console.log(hourlyData);
  return (
    <div
      ref={scrollContainerRef}
      className={styles.hourlyCards}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onDragStart={handleSelectStart}
    >
      {hourlyData &&
        hourlyData.map((hour, index) => <HourCard hour={hour} key={index} />)}
    </div>
  );
}

export default HourlyForecast;
