import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkshopById } from "./workshopService";
import EnrollButton from "../enrollment/EnrollButton";

export default function WorkshopDetails() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    getWorkshopById(id)
      .then((res) => setWorkshop(res.data))
      .catch(() => alert("Workshop not found"));
  }, [id]);

  if (!workshop) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{workshop.title}</h1>
      <p className="mt-3 text-gray-600">{workshop.description}</p>
      <p className="mt-2 font-semibold">Price: ₹{workshop.price}</p>

      <EnrollButton workshopId={workshop.id} />
    </div>
  );
}
