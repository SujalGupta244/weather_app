const DailySummary = ({ summary, temp }) => {
    return (
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-gray-900 text-xl font-bold mb-2">{summary.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-md shadow">
            <h3 className="text-gray-900 font-semibold text-lg">Average Temperature</h3>
            <p className="text-blue-600 text-xl">{summary.avgTemp} {temp[1].toLowerCase() == 'c' ? "°C" : temp[1].toLowerCase() == 'f' ? "°F" : "°K"}</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow">
            <h3 className="text-gray-900 font-semibold text-lg">Max Temperature</h3>
            <p className="text-red-600 text-xl">{summary.maxTemp} {temp[1].toLowerCase() == 'c' ? "°C" : temp[1].toLowerCase() == 'f' ? "°F" : "°K"}</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow">
            <h3 className="text-gray-900 font-semibold text-lg">Min Temperature</h3>
            <p className="text-green-600 text-xl">{summary.minTemp} {temp[1].toLowerCase() == 'c' ? "°C" : temp[1].toLowerCase() == 'f' ? "°F" : "°K"}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-gray-400 font-semibold text-lg">Dominant Weather Condition</h3>
          <p className="text-blue-800 text-xl">{summary.dominantCondition}</p>
        </div>
      </div>
    );
};

export default DailySummary;
  