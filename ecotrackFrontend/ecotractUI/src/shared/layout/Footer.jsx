import { Link } from "react-router-dom";
import { Leaf, Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-green-500 mb-3">
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-bold">EcoTrack</span>
          </div>
          <p className="text-sm text-gray-400">
            EcoTrack helps you discover eco-friendly workshops and make a real
            impact on the environment 🌱
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400">Home</Link>
            </li>
            <li>
              <Link to="/workshops" className="hover:text-green-400">
                Workshops
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-400">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-400">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Contact
          </h3>
          <div className="flex items-center gap-2 text-sm mb-2">
            <Mail className="w-4 h-4 text-green-400" />
            <span>support@ecotrack.com</span>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-green-400">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-400">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EcoTrack. All rights reserved.
      </div>
    </footer>
  );
}
