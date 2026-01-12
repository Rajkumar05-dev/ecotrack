export const initiateRazorpayPayment = async (razorpayOrderId, amount, onSuccess) => {
  const options = {
    key: "rzp_test_S060WMnc2eFoWe",
    amount: amount,
    currency: "INR",
    name: "EcoTrack",
    description: "Workshop Enrollment",
    order_id: razorpayOrderId,

    handler: async function (response) {
      try {
        const confirmResponse = await fetch("http://localhost:8080/enroll/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          })
        });

        if (confirmResponse.ok) {
          if (onSuccess) {
            onSuccess();
          }
          alert("Enrollment Successful");
        } else {
          const error = await confirmResponse.json().catch(() => ({ message: 'Payment confirmation failed' }));
          alert(`Payment confirmation failed: ${error.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Payment confirmation error:', error);
        alert(`Error confirming payment: ${error.message}`);
      }
    },

    theme: {
      color: "#2ecc71"
    },

    modal: {
      ondismiss: function() {
        console.log('Payment modal closed');
      }
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
  
  razorpay.on('payment.failed', function (response) {
    alert(`Payment failed: ${response.error.description}`);
  });
};
