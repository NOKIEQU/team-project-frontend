"use client";

import Link from "next/link";
import { SearchCode } from "lucide-react";
import { LayoutDashboard, Gamepad2, BarChart, Layers } from "lucide-react";
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
    // e.preventDefault();
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

}


return (
  <div className="flex min-h-screen relative">

    {/* Sidebar */}
    <div className="bg-gray-950 text-white w-64 flex flex-col p-5 space-y-4">
      <nav className="space-y-2">
        <SidebarLink
          href="/admin"
          icon={<LayoutDashboard />}
          text="Dashboard"
        />
        <SidebarLink href="/adminGames" icon={<Gamepad2 />} text="Games" />
        <SidebarLink href="/adminUsers" icon={<BarChart />} text="Users" />
        <SidebarLink href="/adminGenres" icon={<Layers />} text="Genres" />
      </nav>
    </div>

    {/* Main Content Section */}
    <div className="bg-gray-100 flex-1 p-6 flex flex-col relative">


      <div className="absolute top-6 right-6">
        <button onClick={() => { setShowAddGamePopup(true) }} className="bg-gray-950 text-[#F0ECEC] py-3 px-4 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all">
          Add Games
        </button>
      </div>

      <h1 className="text-gray-900 text-3xl font-bold">Games</h1>

      <div className="bg-gray-950 text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
        <SearchCode className="text-xl" />
        <input
          type="text"
          placeholder="Search for games..."
          className="bg-transparent border-b-2 border-white text-white focus:outline-none w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-gray-950 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={game.imageUrls[0]}
              alt={game.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{game.title}</h3>
            <p className="text-sm text-gray-400">Genre: {game.genre?.name || "Unknown"}</p>
            <h3 className="w-full text-sm font-semibold">
            Stock: {gameStatus(game)}

            </h3>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">${game.price}</p>
             

              <button
                className="bg-[#F0ECEC] text-black py-1 px-4 rounded-lg text-sm"
                onClick={() => setSelectedGame(game)} // Set the selected game to open the popup
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    {
      selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={editGameTitle}
                  onChange={(e) => setEditGameTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={editGamePrice}
                  onChange={(e) => setEditGamePrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={editGameDesc}
                  onChange={(e) => setEditGameDec(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={editGameGenre}
                  onChange={(e) => setEditGameGenre(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedGame.stock}
                  onChange={(e) => updateStock(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  onClick={(e) => deleteGame(e, selectedGame.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                  onClick={() => setSelectedGame(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
    {showAddGamePopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newGameTitle}
                onChange={(e) => setNewGameTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newGameDescription}
                onChange={(e) => setNewGameDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newGamePrice}
                onChange={(e) => setNewGamePrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newGameRating}
                onChange={(e) => setNewGameRating(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Release Year</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newGameReleaseYear}
                onChange={(e) => setNewGameReleaseYear(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Genre ID</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newGameGenreId}
                onChange={(e) => setNewGameGenreId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Age Rating</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newAgeRating}
                onChange={(e) => setNewAgeRating(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={(e) => setNewGameImage(e.target.files[0])}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                onClick={() => setShowAddGamePopup(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
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

