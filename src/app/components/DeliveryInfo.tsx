"use client";
import { useState } from "react";

export default function DeliveryInfo() {
  const [pincode, setPincode] = useState("");

  const handleCheck = () => {
    if (!pincode) {
      alert("Please enter a valid pincode");
    } else {
     
      alert(`Checking delivery for pincode: ${pincode}`);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-lg font-semibold mb-2">
        Delivery & Nearest Store Information
      </h2>
      <p className="text-gray-600 mb-4">
        Enter Pin Code for a better delivery estimate and nearest store information.
      </p>

      <div className="flex max-w-md">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Delivery Pincode"
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleCheck}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-r-md font-semibold"
        >
          Check
        </button>
      </div>
    </div>
  );
}
