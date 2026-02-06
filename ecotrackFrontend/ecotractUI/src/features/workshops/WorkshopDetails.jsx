import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkshopById } from "./workshopService";
import { useAuth } from "../../context/AuthContext";
import { enrollWorkshop } from "../enrollment/enrollService";
import { loadRazorpay } from "../../utils/loadRazorpay";

export default function WorkshopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    getWorkshopById(id)
      .then(res => setWorkshop(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!auth) {
      navigate("/login");
      return;
    }

    setPaying(true);
    try {
      // 1️⃣ create order
      const { data } = await enrollWorkshop(auth.userId, id);

      // 2️⃣ load razorpay
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed");
        return;
      }

      // 3️⃣ open checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.razorpayOrderId,
        name: "EcoTrack",
        description: workshop.title,

        handler: async (response) => {
          await fetch("http://localhost:8080/enroll/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          alert("Enrollment successful");
          navigate("/");
        },
      };

      new window.Razorpay(options).open();
    } catch {
      alert("Enrollment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!workshop) return <p className="p-6">Workshop not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">
          {workshop.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {workshop.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            ₹{workshop.price}
          </span>

          {auth?.role === "ROLE_USER" && (
            <button
              onClick={handleEnroll}
              disabled={paying}
              className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {paying ? "Processing..." : "Enroll Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
