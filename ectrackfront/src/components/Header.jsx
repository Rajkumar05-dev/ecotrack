function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold text-eco-green">EcoTrack</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-eco-green transition">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-eco-green transition">Track</a>
            <a href="#" className="text-gray-700 hover:text-eco-green transition">Reports</a>
            <a href="#" className="text-gray-700 hover:text-eco-green transition">Settings</a>
          </nav>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
