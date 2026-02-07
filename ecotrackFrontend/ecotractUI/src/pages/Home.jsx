import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-green-700">
        EcoTrack Workshops 🌱
      </h1>
      <p className="mt-4 text-gray-600">
        Learn sustainability with hands-on workshops
      </p>

      <Link
        to="/workshops"
        className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        View Workshops
      </Link>
    </div>
  );
}
