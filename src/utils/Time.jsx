import React, { useEffect, useState } from "react";

const Time = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000); // Updates every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <p className="text-lg font-semibold">Date: {formattedDate}</p>
      <p className="text-lg font-semibold mt-2">Time: {formattedTime}</p>
    </div>
  );
};

export default Time;
