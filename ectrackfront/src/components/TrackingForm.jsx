import { useState } from 'react'

function TrackingForm({ onAddEntry }) {
  const [formData, setFormData] = useState({
    activity: '',
    carbonSaved: '',
    wasteReduced: '',
    energySaved: '',
    date: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.activity) return

    onAddEntry({
      ...formData,
      carbonSaved: parseFloat(formData.carbonSaved) || 0,
      wasteReduced: parseFloat(formData.wasteReduced) || 0,
      energySaved: parseFloat(formData.energySaved) || 0,
    })

    setFormData({
      activity: '',
      carbonSaved: '',
      wasteReduced: '',
      energySaved: '',
      date: new Date().toISOString().split('T')[0],
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Your Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
            Activity Name
          </label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="e.g., Used public transport"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="carbonSaved" className="block text-sm font-medium text-gray-700 mb-2">
              CO₂ Saved (kg)
            </label>
            <input
              type="number"
              id="carbonSaved"
              name="carbonSaved"
              value={formData.carbonSaved}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="wasteReduced" className="block text-sm font-medium text-gray-700 mb-2">
              Waste (kg)
            </label>
            <input
              type="number"
              id="wasteReduced"
              name="wasteReduced"
              value={formData.wasteReduced}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="energySaved" className="block text-sm font-medium text-gray-700 mb-2">
              Energy (kWh)
            </label>
            <input
              type="number"
              id="energySaved"
              name="energySaved"
              value={formData.energySaved}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-eco-green hover:bg-eco-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          Add Entry
        </button>
      </form>
    </div>
  )
}

export default TrackingForm
