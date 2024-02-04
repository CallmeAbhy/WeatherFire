import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    recentDate: "",
    status: "active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, recentDate, status } = formData;

    try {
      const docRef = await addDoc(collection(db, "entries"), {
        Name: name,
        A_Date: new Date(recentDate),
        Status: status === "active" ? true : false,
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset form data after successful submission
      setFormData({
        name: "",
        recentDate: "",
        status: "active",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
    >
      <input
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="date"
        placeholder="Recent Date"
        name="recentDate"
        value={formData.recentDate}
        onChange={handleInputChange}
      />
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Status:</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="active"
            name="status"
            value="active"
            className="mr-2"
            checked={formData.status === "active"}
            onChange={handleInputChange}
          />
          <label htmlFor="active" className="mr-4">
            Active
          </label>
          <input
            type="radio"
            id="inactive"
            name="status"
            value="inactive"
            className="mr-2"
            checked={formData.status === "inactive"}
            onChange={handleInputChange}
          />
          <label htmlFor="inactive">Inactive</label>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() =>
            setFormData({
              name: "",
              recentDate: "",
              status: "active",
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Add;
