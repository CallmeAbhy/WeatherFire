import React from "react";

const Row = ({ entry, handleDelete }) => {
  let formattedDate = ""; // Initialize the variable outside of the conditional

  if (entry.Data) {
    const timestamp = entry.A_Date;
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
    );

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    formattedDate = date.toLocaleString("en-US", options);
  }

  return (
    <tr key={entry.id}>
      <td className="px-4 py-2">{entry.Name}</td>
      <td className="px-4 py-2">{"04/02/2024"}</td>
      <td className="px-4 py-2">{entry.Status ? "Active" : "Inactive"}</td>
      <td className="px-4 py-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(entry.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
