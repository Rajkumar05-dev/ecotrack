function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${color} rounded-full p-4 text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard
