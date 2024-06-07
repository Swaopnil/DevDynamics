import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { forecastType } from './../types';
import "./chart.css"
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

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100%] w-full">
    <div className="w-[40%] h-[100%]  text-zinc-900 bg-white/20 backdrop-blur-ls rounded drop-shadow-lg p-8 mb-20 flex flex-col justify-between">
      <h2 className="mt-2 text-lg">Temperature</h2>
      <Line className='chart' data={temperatureData} />
      <hr />
      <h2 className="mt-2 text-lg">Humidity</h2>
      <Bar data={humidityData} />
      <hr />
      <h2 className="mt-2 text-lg">Wind Speed</h2>
      <Line data={windData} />
    </div>
    </div>
  );
};

export default WeatherCharts;
