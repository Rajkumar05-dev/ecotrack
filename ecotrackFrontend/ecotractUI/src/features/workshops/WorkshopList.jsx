import { useEffect, useState } from "react";
import { getWorkshops } from "./workshopService";
import { Link } from "react-router-dom";

export default function WorkshopList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWorkshops().then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6 grid gap-4">
      {data.map(w => (
        <div key={w.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">{w.title}</h3>
          <Link to={`/workshops/${w.id}`} className="text-primary">
            View details
          </Link>
        </div>
      ))}
    </div>
  );
}
