import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import Weather from "./views/Weather";
import UserTable from "./views/UserTable";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [data, setData] = useState({});
  const [location, setLocation] = useState();
  const API_KEY = "3c185fb132ed2154639253cea7d8bd0a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          alert("City not found. Please enter a valid location.");
        });

      setLocation("");
    }
  };

  return (
    <>
      <div className="w-full h-full relative">
        <div className="text-center p-4">
          <input
            type="text"
            className="py-3 px-6 w-[-700px] text-lg rounded-3xl border border-gray-200 placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={searchLocation}
          />
        </div>
        <Weather weatherData={data} />
      </div>
      <div>
        <UserTable />
        <center>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </center>
      </div>
    </>
  );
};

export default Home;
