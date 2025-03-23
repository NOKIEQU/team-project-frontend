"use client";

import {
  LayoutDashboard,
  Gamepad2,
  Layers,
  Users,
  SearchCode,
  ShoppingCart,
  Activity,
  Trash2,
  Edit,
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminGenres() {
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [newGenreName, setNewGenreName] = useState("");
  const [isAddGenrePopupOpen, setIsAddGenrePopupOpen] = useState(false);
  const [addNewGenre, setAddNewGenre] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);

  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  // Fetch genres and games when the user is loaded
  useEffect(() => {
    const fetchData = async () => {
      if (userObject && userObject.token) {
        try {
          // Fetch genres
          const genresResponse = await fetch("http://51.77.110.253:3001/api/genres", {
            headers: {
              Authorization: `Bearer ${userObject.token}`,
            },
          });
          if (genresResponse.ok) {
            const genresData = await genresResponse.json();
            setGenres(genresData);
          } else {
            console.error("Failed to fetch genres:", genresResponse.statusText);
          }

          // Fetch games to count how many per genre
          const gamesResponse = await fetch("http://51.77.110.253:3001/api/products", {
            headers: {
              Authorization: `Bearer ${userObject.token}`,
            },
          });
          if (gamesResponse.ok) {
            const gamesData = await gamesResponse.json();
            setGames(gamesData);
          } else {
            console.error("Failed to fetch games:", gamesResponse.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (isUserLoaded) {
      fetchData();
    }
  }, [isUserLoaded, userObject]);

  // Filter genres based on search term
  const filteredGenres = genres.filter(genre => 
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count games per genre
  const getGameCountForGenre = (genreId) => {
    return games.filter(game => game.genreId === genreId || (game.genre && game.genre.id === genreId)).length;
  };

  // Total game count
  const totalGamesWithGenres = genres.reduce((acc, genre) => {
    return acc + getGameCountForGenre(genre.id);
  }, 0);

  // Handle edit button click
  const handleEditClick = (genre) => {
    setSelectedGenre(genre);
    setNewGenreName(genre.name);
    setIsPopupOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (genre) => {
    setGenreToDelete(genre);
    setIsDeleteConfirmOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://51.77.110.253:3001/api/genres/${genreToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${userObject.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete genre");
      }

      // Remove the deleted genre from the state
      setGenres(genres.filter(genre => genre.id !== genreToDelete.id));
      setIsDeleteConfirmOpen(false);
      setGenreToDelete(null);
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  // Handle save button click in edit popup
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

  // Handle add genre button click
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
      <div className="bg-[#0F0F15] text-white w-64 flex flex-col p-5 space-y-4 border-r border-[#2A2A35]">
        <nav className="space-y-2">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard className="text-[#fa9a00ef]" />}
            text="Dashboard"
          />
          <SidebarLink 
            href="/adminGames" 
            icon={<Gamepad2 className="text-[#fa9a00ef]" />} 
            text="Games" 
          />
          <SidebarLink 
            href="/adminUsers" 
            icon={<Users className="text-[#fa9a00ef]" />} 
            text="Users" 
          />
          <SidebarLink 
            href="/adminGenres" 
            icon={<Layers className="text-[#fa9a00ef]" />} 
            text="Genres" 
          />
          <SidebarLink 
            href="/adminOrders" 
            icon={<ShoppingCart className="text-[#fa9a00ef]" />} 
            text="Orders" 
          />
        </nav>
      </div>

      <div className="bg-[#1A1A22] flex-1 flex flex-col p-6">
        <h1 className="text-white text-3xl font-bold mb-6">Genre Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <StatCard title="Total Genres" value={genres.length.toString()} icon={<Layers />} />
          <StatCard title="Games with Genres" value={totalGamesWithGenres.toString()} icon={<Gamepad2 />} />
        </div>

        {/* Genres Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Genre List</h2>
              <p className="text-gray-400 text-sm">Manage and view all game genres</p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center space-x-2 bg-[#3A3A4A] px-4 py-2 rounded-full">
                <SearchCode className="text-[#fa9a00ef]" />
                <input
                  type="text"
                  placeholder="Search genres..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-white focus:outline-none"
                />
              </div>
              
              <button
                className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300"
                onClick={() => setIsAddGenrePopupOpen(true)}
              >
                Add Genre
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3A3A4A]">
                  <th className="text-left p-3 text-gray-400">Genre ID</th>
                  <th className="text-left p-3 text-gray-400">Genre Name</th>
                  <th className="text-left p-3 text-gray-400">Games Count</th>
                  <th className="text-left p-3 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGenres.length > 0 ? (
                  filteredGenres.map((genre) => (
                    <tr key={genre.id} className="border-b border-[#3A3A4A] hover:bg-[#3A3A4A]/30">
                      <td className="p-3 text-white">{genre.id}</td>
                      <td className="p-3 text-white">{genre.name}</td>
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fa9a00ef]/20 text-[#fa9a00ef]">
                          {getGameCountForGenre(genre.id)}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white p-2 rounded-full transition-colors"
                            onClick={() => handleEditClick(genre)}
                            title="Edit genre"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 p-2 rounded-full transition-colors"
                            onClick={() => handleDeleteClick(genre)}
                            title="Delete genre"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-6 text-gray-400">
                      No genres found matching the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Genre Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-96 text-white">
            <h2 className="text-xl font-semibold mb-4">Edit Genre</h2>
            <input
              type="text"
              value={newGenreName}
              onChange={(e) => setNewGenreName(e.target.value)}
              className="w-full p-2 bg-[#1A1A22] border border-[#3A3A4A] rounded-lg mb-4 text-white"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Genre Popup */}
      {isAddGenrePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-96 text-white">
            <h2 className="text-xl font-semibold mb-4">Add New Genre</h2>
            <input
              type="text"
              placeholder="Enter genre name"
              value={addNewGenre}
              onChange={(e) => setAddNewGenre(e.target.value)}
              className="w-full p-2 bg-[#1A1A22] border border-[#3A3A4A] rounded-lg mb-4 text-white"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => {
                  setIsAddGenrePopupOpen(false);
                  setAddNewGenre("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={handleAddGenre}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-96 text-white">
            <h2 className="text-xl font-semibold mb-2">Delete Genre</h2>
            <p className="mb-4">Are you sure you want to delete the genre "{genreToDelete?.name}"? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setGenreToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#252530] border border-[#3A3A4A] text-white p-4 rounded-xl shadow-md flex items-center space-x-4">
      <div className="bg-[#3A3A4A] p-4 rounded-full text-3xl text-[#fa9a00ef]">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className="text-sm font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default AdminGenres;