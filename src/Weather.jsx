import { Line } from 'react-chartjs-2';

function WeatherChart({ data }) {

    useEffect(() => {
        async function fetchWeatherData() {
          const response = await fetch('/api/weather-summary');
          const data = await response.json();
          setWeatherData(data);
        }
        fetchWeatherData();
    }, []);
      

  const chartData = {
    labels: data.map(entry => new Date(entry.dt * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(entry => entry.temp),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
}

export default WeatherChart