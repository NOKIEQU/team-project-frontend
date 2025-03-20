"use client";

import Link from "next/link";
import { SearchCode } from 'lucide-react';
import { LayoutDashboard, Gamepad2, BarChart, Layers } from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";


function AdminGenres() {

  const [genres, setGenres] = useState([]);
  const { user: userObject } = useUser();

  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch("http://51.77.110.253:3001/api/genres");
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchGenres();
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [newGenreName, setNewGenreName] = useState("");
  const [addNewGenre, setAddNewGenre] = useState("");
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isAddGenrePopupOpen, setIsAddGenrePopupOpen] = useState(false);

  const handleEditClick = (genre) => {
    setSelectedGenre(genre);
    setNewGenreName(genre.name);
    setIsPopupOpen(true);
  };

  const handleSaveClick = async () => {
    try {

      const response = await fetch(`http://51.77.110.253:3001/api/genres/${selectedGenre.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userObject.token}`,
        },
        body: JSON.stringify({ name: newGenreName }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to update genre");
      }

      // Update the genres list locally
      setGenres((prevGenres) =>
        prevGenres.map((genre) =>
          genre.id === selectedGenre.id ? { ...genre, name: newGenreName } : genre
        )
      );

      setIsPopupOpen(false);
      setSelectedGenre(null);
      setNewGenreName("");
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  const handleAddGenre = async () => {
    try {
      const response = await fetch("http://51.77.110.253:3001/api/genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userObject.token}`,
        },
        body: JSON.stringify({ name: addNewGenre }),
      });

      if (!response.ok) {
        throw new Error("Failed to add genre");
      }

      const newGenre = await response.json();

      // Update the genres list locally
      setGenres((prevGenres) => [...prevGenres, newGenre]);

      setIsAddGenrePopupOpen(false);
      setAddNewGenre("");
    } catch (error) {
      console.error("Error adding genre:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-950 text-white w-64 flex flex-col p-5 space-y-4">
        <nav className="space-y-2">
          <SidebarLink href="/admin" icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarLink href="/adminGames" icon={<Gamepad2 />} text="Games" />
          <SidebarLink href="/adminUsers" icon={<BarChart />} text="Users" />
          <SidebarLink href="/adminGenres" icon={<Layers />} text="Genres" />
        </nav>
      </div>

      {/* Main content */}
      <div className="bg-gray-100 flex-1 p-6 flex flex-col relative">

        {/* Title */}
        <h1 className="text-gray-900 text-3xl font-bold">Genres</h1>

        {/* Search Bar Section */}
        {/* <div className="bg-gray-950 text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
          <SearchCode className="text-xl" />
          <input
            type="text"
            placeholder="Search for genres..."
            className="bg-transparent border-b-2 border-white text-white focus:outline-none w-full"
          />
        </div> */}


        <div className="absolute top-6 right-6">
          <button
            className="bg-[#111827] text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all"
            onClick={() => setIsAddGenrePopupOpen(true)}
          >
            Add Genre
          </button>
        </div>


        {isAddGenrePopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add New Genre</h2>
              <input
                type="text"
                placeholder="Enter genre name"
                value={addNewGenre}
                onChange={(e) => setAddNewGenre(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                  onClick={() => {
                    setIsAddGenrePopupOpen(false);
                    setAddNewGenre("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={handleAddGenre}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Genres List</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Genre ID</th>
                  <th className="p-3 text-left">Genre Name</th>
                  <th className="p-3 text-left">Number of Games</th>
                  <th className="p-3 text-left">Actions</th>

                </tr>

              </thead>
              <tbody>
                {genres.map((genre, index) => (
                  <tr key={index} className="border-t text-gray-800 hover:bg-gray-50">
                    <td className="p-3">{genre.id}</td>
                    <td className="p-3">{genre.name}</td>
                    <td className="p-3">4</td>
                    <td className="p-3">
                      <button
                        className="bg-[#111827] text-white py-1 px-4 rounded-lg text-sm"
                        onClick={() => handleEditClick(genre)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {
        isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Genre</h2>
              <input
                type="text"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default AdminGenres;
