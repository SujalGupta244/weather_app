const CityWeatherCard = ({ city, weatherData, temp }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-gray-900 text-xl font-bold mb-2">{city}</h2>
        <p className="text-gray-700">
          <strong>Temperature:</strong> {weatherData.temp} {temp[1].toLowerCase() == 'c' ? "°C" : temp[1].toLowerCase() == 'f' ? "°F" : "°K"}
        </p>
        <p className="text-gray-700">
          <strong>Feels Like:</strong> {weatherData.feels_like} {temp[1].toLowerCase() == 'c' ? "°C" : temp[1].toLowerCase() == 'f' ? "°F" : "°K"}
        </p>
        <p className="text-gray-700">
          <strong>Condition:</strong> {weatherData.main}
        </p>
        <p className="text-sm text-gray-500">
          Last updated: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
        </p>
      </div>
    );
};
  
export default CityWeatherCard;
  