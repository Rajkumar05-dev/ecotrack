import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWorkshops } from "./workshopService";

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkshops()
      .then((res) => {
        setWorkshops(res.data);
      })
      .catch(() => setError("Failed to load workshops"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Workshops</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workshops.map((w) => (
          <div
            key={w.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <p className="text-gray-700">{w.description}</p>
            <p className="mt-2 font-semibold">Price: ₹{w.price}</p>

            <button
              onClick={() => navigate(`/workshops/${w.id}`)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopList;
