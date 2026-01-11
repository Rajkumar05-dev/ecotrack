import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TrackingForm from './components/TrackingForm'
import StatsCard from './components/StatsCard'

function App() {
  const [trackingData, setTrackingData] = useState([])

  const addTrackingEntry = (entry) => {
    setTrackingData([...trackingData, { ...entry, id: Date.now() }])
  }

  const totalCarbonSaved = trackingData.reduce((sum, entry) => sum + (entry.carbonSaved || 0), 0)
  const totalWasteReduced = trackingData.reduce((sum, entry) => sum + (entry.wasteReduced || 0), 0)
  const totalEnergySaved = trackingData.reduce((sum, entry) => sum + (entry.energySaved || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to EcoTrack</h1>
          <p className="text-gray-600">Track your environmental impact and make a difference</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Carbon Saved"
            value={`${totalCarbonSaved.toFixed(2)} kg`}
            icon="🌱"
            color="bg-green-500"
          />
          <StatsCard
            title="Waste Reduced"
            value={`${totalWasteReduced.toFixed(2)} kg`}
            icon="♻️"
            color="bg-blue-500"
          />
          <StatsCard
            title="Energy Saved"
            value={`${totalEnergySaved.toFixed(2)} kWh`}
            icon="⚡"
            color="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TrackingForm onAddEntry={addTrackingEntry} />
          <Dashboard trackingData={trackingData} />
        </div>
      </main>
    </div>
  )
}

export default App
