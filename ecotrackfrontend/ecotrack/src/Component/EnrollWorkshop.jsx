import React from "react";

const EnrollWorkshop = ({ userId, workshopId }) => {
  const enrollWorkshop = async () => {
    try {
      // 1. Call enroll API
      const enrollResponse = await fetch(
        `http://localhost:8080/enroll/${userId}/enroll/${workshopId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // EnrollmentsDto if needed
        }
      );

      if (!enrollResponse.ok) {
        throw new Error("Enrollment request failed");
      }

      const enrollment = await enrollResponse.json();

      const { razorpayOrderId, amount, currency } = enrollment;

      // 2. Razorpay options
      const options = {
        key: "rzp_test_S060WMnc2eFoWe",
        amount: amount,
        currency: currency,
        name: "EcoTrack",
        description: "Workshop Enrollment",
        order_id: razorpayOrderId,

        handler: async function (response) {
          // 3. Confirm payment
          const confirmResponse = await fetch(
            "http://localhost:8080/enroll/confirm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            }
          );

          if (!confirmResponse.ok) {
            throw new Error("Payment confirmation failed");
          }

          alert("Enrollment successful!");
        },

        theme: {
          color: "#2ecc71",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return <button onClick={enrollWorkshop}>Enroll Now</button>;
};

export default EnrollWorkshop;