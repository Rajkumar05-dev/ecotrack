function Dashboard({ trackingData }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</h2>
      {trackingData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No activities tracked yet</p>
          <p className="text-gray-400 text-sm">Start tracking your environmental impact!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trackingData.slice().reverse().map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{entry.activity}</h3>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {entry.carbonSaved > 0 && (
                  <div>
                    <span className="text-gray-600">CO₂: </span>
                    <span className="font-medium text-green-600">{entry.carbonSaved.toFixed(2)} kg</span>
                  </div>
                )}
                {entry.wasteReduced > 0 && (
                  <div>
                    <span className="text-gray-600">Waste: </span>
                    <span className="font-medium text-blue-600">{entry.wasteReduced.toFixed(2)} kg</span>
                  </div>
                )}
                {entry.energySaved > 0 && (
                  <div>
                    <span className="text-gray-600">Energy: </span>
                    <span className="font-medium text-yellow-600">{entry.energySaved.toFixed(2)} kWh</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
