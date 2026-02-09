export default function EnrollButton({ workshopId }) {
  const handleEnroll = async () => {
    try {
      await enrollWorkshop(workshopId);
      alert("Enrollment successful ✅");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired, please login again ❌");
      } else {
        alert("Enrollment failed ❌");
      }
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
    >
      Enroll Now
    </button>
  );
}
