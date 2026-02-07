import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllWorkshops } from "./workshopService";

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkshops()
      .then((res) => {
        setWorkshops(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Available Workshops
      </h1>

      {workshops.length === 0 ? (
        <p>No workshops available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <div
              key={w.id}
              className="border rounded-xl p-5 shadow"
            >
              <h2 className="text-xl font-semibold">
                {w.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {w.description}
              </p>

              <Link
                to={`/workshops/${w.id}`}
                className="inline-block mt-4 text-green-600"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
