import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ensure react-icons is installed

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const role = user?.role || user?.authorities?.[0]?.authority;
    const isAdmin = role === 'ROLE_ADMIN';
    const isUser = role === 'ROLE_USER';

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">EcoTrack</Link>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/workshops" className="hover:text-gray-300">Workshops</Link>

                    {isUser && (
                        <Link to="/user/dashboard" className="hover:text-gray-300">Dashboard</Link>
                    )}

                    {isAdmin && (
                        <>
                            <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                            <Link to="/admin/workshops" className="hover:text-gray-300">Manage Workshops</Link>
                        </>
                    )}

                    {user ? (
                        <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register" className="hover:text-gray-300">Register</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2 space-y-2">
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link>
                    <Link to="/workshops" className="block py-2 px-4 hover:bg-gray-700">Workshops</Link>
                    {isUser && (
                        <Link to="/user/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
                    )}
                    {isAdmin && (
                        <>
                            <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
                            <Link to="/admin/workshops" className="block py-2 px-4 hover:bg-gray-700">Manage Workshops</Link>
                        </>
                    )}
                    {user ? (
                        <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-gray-700">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="block py-2 px-4 hover:bg-gray-700">Login</Link>
                            <Link to="/register" className="block py-2 px-4 hover:bg-gray-700">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
