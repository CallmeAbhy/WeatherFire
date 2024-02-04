import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import Weather from "./views/Weather";
import UserTable from "./views/UserTable";

const Home = () => {
  const userData = [
    { username: "User1", addedDate: "2022-02-10", status: "Active" },
    { username: "User2", addedDate: "2022-02-15", status: "Inactive" },
    // Add more user data as needed
  ];
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
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <>
      <div className="w-full h-full relative">
        <div className="text-center p-4">
          {/* <nav className="bg-transparent py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-black text-lg font-semibold">
            Home
          </Link>
          <div className="flex space-x-4">
            <Link to="/table" className="text-black">
              Table
            </Link>
            <button
              className="text-black cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav> */}
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
      </div>
    </>
  );
};

export default Home;
