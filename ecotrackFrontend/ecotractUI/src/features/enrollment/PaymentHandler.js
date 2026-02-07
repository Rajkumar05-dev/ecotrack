import { confirmEnrollment } from "./enrollService";
import { loadRazorpay } from "../../utils/loadRazorpay";

export const openRazorpayCheckout = async ({
  order,
  token,
  workshopTitle,
  onSuccess,
}) => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay SDK load failed");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: order.amount,
    currency: "INR",
    order_id: order.razorpayOrderId,
    name: "EcoTrack",
    description: workshopTitle,

    handler: async (response) => {
      await confirmEnrollment({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });

      onSuccess();
    },

    prefill: {
      email: order.email || "",
    },

    theme: {
      color: "#16a34a",
    },
  };

  new window.Razorpay(options).open();
};
