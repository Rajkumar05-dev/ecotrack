import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="bg-green-600 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to EcoTrack</h1>
                <p className="text-xl md:text-2xl mb-8">Join our workshops and learn how to make a positive impact on the environment.</p>
                <Link to="/workshops" className="bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
                    Explore Workshops
                </Link>
            </div>

            {/* Features Section */}
            <div className="container mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose EcoTrack?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-green-500 text-4xl mb-4">🌱</div>
                        <h3 className="text-xl font-semibold mb-2">Sustainable Living</h3>
                        <p className="text-gray-600">Learn practical skills for a more sustainable lifestyle.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-green-500 text-4xl mb-4">🤝</div>
                        <h3 className="text-xl font-semibold mb-2">Community</h3>
                        <p className="text-gray-600">Connect with like-minded individuals and experts.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-green-500 text-4xl mb-4">🎓</div>
                        <h3 className="text-xl font-semibold mb-2">Expert Led</h3>
                        <p className="text-gray-600">Workshops led by industry professionals.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
