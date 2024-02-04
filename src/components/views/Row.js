import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Row = ({ entry, handleDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);

    try {
      const entryRef = doc(db, "entries", entry.id);
      await updateDoc(entryRef, {
        Status: !entry.Status, // Toggle the status
      });
    } catch (error) {
      console.error("Error updating status: ", error);
    }

    setIsUpdating(false);
  };

  const timestamp = entry.A_Date;
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formattedDate = date.toLocaleString("en-US", options);
  console.log(formattedDate);

  return (
    <tr key={entry.id}>
      <td className="px-4 py-2">{entry.Name}</td>
      <td className="px-4 py-2">{formattedDate}</td>
      <td className="px-4 py-2">{entry.Status ? "Active" : "Inactive"}</td>
      <td className="px-4 py-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(entry.id)}
        >
          Delete
        </button>
        <button
          className={`${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2`}
          onClick={handleStatusUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Toggle Status"}
        </button>
      </td>
    </tr>
  );
};

export default Row;
