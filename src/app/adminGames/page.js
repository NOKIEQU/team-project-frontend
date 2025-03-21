"use client";

import Link from "next/link";
import { SearchCode } from "lucide-react";
import { LayoutDashboard, Gamepad2, BarChart, Layers, Users, ShoppingCart } from "lucide-react";
import SidebarLink from "../components/SidebarLink";

import { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";

function AdminGames() {
  const [games, setGames] = useState([]);
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [editGameTitle, setEditGameTitle] = useState(selectedGame?.title ?? "");
  const [editGameDesc, setEditGameDec] = useState(selectedGame?.description ?? "");
  const [editGamePrice, setEditGamePrice] = useState(selectedGame?.price ?? "");
  const [editGameGenre, setEditGameGenre] = useState(selectedGame?.genre ?? "");
  const [showAddGamePopup, setShowAddGamePopup] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGamePrice, setNewGamePrice] = useState("");
  const [newGameRating, setNewGameRating] = useState("");
  const [newGameReleaseYear, setNewGameReleaseYear] = useState("");
  const [newGameGenreId, setNewGameGenreId] = useState("");
  const [newGameImage, setNewGameImage] = useState(null);
  const [newAgeRating, setNewAgeRating] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  // Fetch orders only when the user is loaded
  useEffect(() => {
    const fetchGames = async () => {
      if (!userObject || !userObject.token) {
        console.error("User is not authenticated. Cannot fetch games.");
        return;
      }

      try {
        const response = await fetch("http://51.77.110.253:3001/api/products", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch games: ${response.statusText}`);
        }

        const data = await response.json();
        setGames(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    if (isUserLoaded) {
      fetchGames();
    }
  }, [isUserLoaded, userObject]);

  function gameStatus(game) {
    if (game.stockStatus === "IN_STOCK") {
      return <p className="text-green-500">{game.stock}</p>;
    } else if (game.stockStatus === "OUT_OF_STOCK") {
      return <p className="text-red-500">{game.stock}</p>;
    } else {
      return <p className="text-yellow-500">{game.stock}</p>;
    }
  }

  async function deleteGame(e, gameId) {
    console.log("Deleting game with ID:", gameId);
    try {
      const response = await fetch(`http://51.77.110.253:3001/api/products/${gameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userObject.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete game: ${response.statusText}`);
      }

      setSelectedGame(null); // Close the popup
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  }

  async function updateStock(gameId, stock) {
    // Implement stock update functionality
  }

  return (
    <div className="flex min-h-screen relative">
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

      <div className="bg-[#1A1A22] flex-1 p-6 flex flex-col relative">
        <div className="absolute top-6 right-6">
          <button 
            onClick={() => { setShowAddGamePopup(true) }} 
            className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300"
          >
            Add Games
          </button>
        </div>

        <h1 className="text-white text-3xl font-bold">Games</h1>

        <div className="bg-[#252530] border border-[#3A3A4A] text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
          <SearchCode className="text-[#fa9a00ef]" />
          <input
            type="text"
            placeholder="Search for games..."
            className="bg-transparent border-b-2 border-[#3A3A4A] text-white focus:outline-none focus:border-[#fa9a00ef] w-full transition-colors"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#252530] border border-[#3A3A4A] text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={game.imageUrls[0]}
                alt={game.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <p className="text-sm text-gray-400">Genre: {game.genre?.name || "Unknown"}</p>
              <h3 className="w-full text-sm font-semibold mt-2">
                Stock: {gameStatus(game)}
              </h3>
              <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold text-white">£{game.price}</p>
                <button
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-1 px-4 rounded-lg text-sm transition-colors"
                  onClick={() => setSelectedGame(game)} 
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Game Popup */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-96 text-white">
            <h2 className="text-xl font-bold mb-4">Edit Game</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(`http://51.77.110.253:3001/api/products/${selectedGame.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userObject.token}`,
                    },
                    body: JSON.stringify({
                      title: editGameTitle === "" ? selectedGame.title : editGameTitle,
                      price: editGamePrice === "" ? selectedGame.price : editGamePrice,
                      genre: editGameGenre === "" ? selectedGame.genre : editGameGenre,
                      description: editGameDesc === "" ? selectedGame.description : editGameDesc,
                    }),
                  });

                  if (!response.ok) {
                    throw new Error(`Failed to update game: ${response.statusText}`);
                  }

                  const updatedGame = await response.json();
                  setGames((prevGames) =>
                    prevGames.map((game) =>
                      game.id === updatedGame.id ? updatedGame : game
                    )
                  );
                  setSelectedGame(null); // Close the popup
                } catch (error) {
                  console.error("Error updating game:", error);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={editGameTitle}
                  onChange={(e) => setEditGameTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Price</label>
                <input
                  type="number"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={editGamePrice}
                  onChange={(e) => setEditGamePrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={editGameDesc}
                  onChange={(e) => setEditGameDec(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Genre</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={editGameGenre}
                  onChange={(e) => setEditGameGenre(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Stock</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={selectedGame.stock}
                  onChange={(e) => updateStock(selectedGame.id, e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={(e) => deleteGame(e, selectedGame.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={() => setSelectedGame(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Game Popup */}
      {showAddGamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-96 text-white max-h-screen overflow-auto">
            <h2 className="text-xl font-bold mb-4">Add Game</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("title", newGameTitle);
                formData.append("description", newGameDescription);
                formData.append("price", newGamePrice);
                formData.append("rating", newGameRating);
                formData.append("releaseYear", newGameReleaseYear);
                formData.append("genreId", newGameGenreId);
                formData.append("ageRating", newAgeRating);
                if (newGameImage) {
                  formData.append("product", newGameImage);
                }

                try {
                  const response = await fetch("http://51.77.110.253:3001/api/products", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${userObject.token}`,
                    },
                    body: formData,
                  });

                  if (!response.ok) {
                    throw new Error(`Failed to add game: ${response.statusText}`);
                  }

                  const addedGame = await response.json();
                  setGames((prevGames) => [...prevGames, addedGame]);
                  setShowAddGamePopup(false); // Close the popup
                } catch (error) {
                  console.error("Error adding game:", error);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameDescription}
                  onChange={(e) => setNewGameDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Price</label>
                <input
                  type="number"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGamePrice}
                  onChange={(e) => setNewGamePrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameRating}
                  onChange={(e) => setNewGameRating(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Release Year</label>
                <input
                  type="number"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameReleaseYear}
                  onChange={(e) => setNewGameReleaseYear(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Genre ID</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameGenreId}
                  onChange={(e) => setNewGameGenreId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Age Rating</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newAgeRating}
                  onChange={(e) => setNewAgeRating(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Image</label>
                <input
                  type="file"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  onChange={(e) => setNewGameImage(e.target.files[0])}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={() => setShowAddGamePopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminGames;