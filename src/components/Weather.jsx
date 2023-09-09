// src/Weather.js
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      const temperatureCelsius = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
      data.main.temp = temperatureCelsius; // Update the temperature value
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          className="p-2 border rounded w-full mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchWeatherData}
        >
          Get Weather
        </button>
        {weatherData && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
            <p className="text-gray-600">
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="text-gray-600">
              Weather: {weatherData.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
