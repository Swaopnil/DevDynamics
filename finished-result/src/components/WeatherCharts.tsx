import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { forecastType } from './../types';
import "./chart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

type Props = {
  data: forecastType;
};

const WeatherCharts = ({ data }: Props) => {
  const labels = data.list.map((item) => new Date(item.dt * 1000).toLocaleTimeString());

  const temperatureData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.list.map((item) => item.main.temp),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const humidityData = {
    labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: data.list.map((item) => item.main.humidity),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const windData = {
    labels,
    datasets: [
      {
        label: 'Wind Speed (km/h)',
        data: data.list.map((item) => item.wind.speed),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
    ],
  };

  const precipitationData = {
    labels: ['No Rain', 'Rain'],
    datasets: [
      {
        data: [
          100 - Math.round(data.list[0].pop * 100), // No Rain
          Math.round(data.list[0].pop * 100) // Rain
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const handleButtonClick = () => {
    window.location.reload();
  };

  return (
    <div className="weather-charts-container">
      <div className="chart-wrapper">
        <h2>Temperature</h2>
        <Line className="chart" data={temperatureData} />
      </div>
      <div className="chart-wrapper">
        <h2>Humidity</h2>
        <Bar className="chart" data={humidityData} />
      </div>
      <div className="chart-wrapper">
        <h2>Wind Speed</h2>
        <Line className="chart" data={windData} />
      </div>
      <div className="chart-wrapper centered-chart">
        <h2>Precipitation Probability</h2>
        <Pie className="chart" data={precipitationData} />
      </div>
      <div className="search-button-wrapper">
        <button className="search-button" onClick={handleButtonClick}>
          Search Another City
        </button>
      </div>
    </div>
  );
};

export default WeatherCharts;
