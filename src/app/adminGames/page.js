"use client";

import {
  LayoutDashboard,
  Gamepad2,
  Layers,
  Users,
  SearchCode,
  ShoppingCart,
  Activity,
  Plus,
  Tag,
  AlertTriangle,
  Warehouse,
  Bookmark,
  ArrowUpDown,
  Filter,
  Star,
  Eye
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminGames() {
  const [games, setGames] = useState([]);
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [editGameTitle, setEditGameTitle] = useState("");
  const [editGameDesc, setEditGameDesc] = useState("");
  const [editGamePrice, setEditGamePrice] = useState("");
  const [editGameGenre, setEditGameGenre] = useState("");
  const [showAddGamePopup, setShowAddGamePopup] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGamePrice, setNewGamePrice] = useState("");
  const [newGameRating, setNewGameRating] = useState("");
  const [newGameReleaseYear, setNewGameReleaseYear] = useState("");
  const [newGameGenreId, setNewGameGenreId] = useState("");
  const [newGameImage, setNewGameImage] = useState(null);
  const [newAgeRating, setNewAgeRating] = useState("");
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Filter games based on search term and active filter
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch(activeFilter) {
      case "all":
        return matchesSearch;
      case "inStock":
        return matchesSearch && game.stockStatus === "IN_STOCK";
      case "outOfStock":
        return matchesSearch && game.stockStatus === "OUT_OF_STOCK";
      case "lowStock":
        return matchesSearch && game.stockStatus === "IN_STOCK" && game.stock < 5;
      default:
        return matchesSearch;
    }
  });
  
  // Sort games
  const sortedGames = [...filteredGames].sort((a, b) => {
    let comparison = 0;
    
    switch(sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "releaseYear":
        comparison = (a.releaseYear || 0) - (b.releaseYear || 0);
        break;
      case "stock":
        comparison = (a.stock || 0) - (b.stock || 0);
        break;
      default:
        comparison = a.title.localeCompare(b.title);
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };
  
  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  // Fetch games and genres when the user is loaded
  useEffect(() => {
    const fetchData = async () => {
      if (!userObject || !userObject.token) {
        console.error("User is not authenticated. Cannot fetch data.");
        return;
      }

      setIsLoading(true);
      
      try {
        // Fetch games
        const gamesResponse = await fetch("http://51.77.110.253:3001/api/products", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!gamesResponse.ok) {
          throw new Error(`Failed to fetch games: ${gamesResponse.statusText}`);
        }

        const gamesData = await gamesResponse.json();
        setGames(gamesData);
        console.log(gamesData)
        
        const genresResponse = await fetch("http://51.77.110.253:3001/api/genres", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!genresResponse.ok) {
          throw new Error(`Failed to fetch genres: ${genresResponse.statusText}`);
        }

        const genresData = await genresResponse.json();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isUserLoaded) {
      fetchData();
    }
  }, [isUserLoaded, userObject]);

  // Handle edit click
  const handleEditClick = (game) => {
    setSelectedGame(game);
    setEditGameTitle(game.title || "");
    setEditGameDesc(game.description || "");
    setEditGamePrice(game.price || "");
    setEditGameGenre(game.genreId || "");
  };

  const updateStockStatus = (stock) => {
    if (stock <= 0) {
      return "OUT_OF_STOCK";
    } else {
      return "IN_STOCK";
    }
  };

  // Calculate stats
  const inStockCount = games.filter(game => game.stockStatus === "IN_STOCK").length;
  const lowStockCount = games.filter(game => game.stockStatus === "IN_STOCK" && game.stock < 5).length;
  const totalValue = games.reduce((sum, game) => sum + (game.price * (game.stock || 0)), 0);

  function gameStatus(game) {
    if (game.stock <= 0 || game.stockStatus === "OUT_OF_STOCK") {
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-500">Out of Stock</span>;
    } else if (game.stockStatus === "IN_STOCK") {
      if (game.stock < 5) {
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-500">{game.stock || 0} (Low)</span>;
      }
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-500">{game.stock || 0}</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fa9a00ef]/20 text-[#fa9a00ef]">{game.stock || 0}</span>;
    }
  }

  async function deleteGame(e, gameId) {
    e.preventDefault();
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

      // Remove the game from state
      setGames(games.filter(game => game.id !== gameId));
      setSelectedGame(null); // Close the popup
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  }

  async function updateGame(e) {
    e.preventDefault();
    
    try {
      // Create the update data object
      const updateData = {
        title: editGameTitle,
        price: editGamePrice,
        genreId: editGameGenre,
        description: editGameDesc,
        ageRating: selectedGame.ageRating
      };

      console.log("Sending update with data:", updateData); // For debugging

      const response = await fetch(`http://51.77.110.253:3001/api/products/${selectedGame.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userObject.token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update game: ${response.statusText}`);
      }

      const updatedGame = await response.json();
      
      // Update the game in the local state
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === updatedGame.id ? updatedGame : game
        )
      );
      
      setSelectedGame(null); // Close the popup
    } catch (error) {
      console.error("Error updating game:", error);
      alert("Failed to update the game. Please try again.");
    }
  }

  async function addGame(e) {
    e.preventDefault();
    

    try {
      // Create a FormData object
      const formData = new FormData();
      
      // Add text/numeric data as individual fields
      formData.append("title", newGameTitle);
      formData.append("description", newGameDescription);
      formData.append("price", newGamePrice);
      formData.append("rating", newGameRating);
      formData.append("releaseYear", newGameReleaseYear);
      formData.append("genreId", newGameGenreId);
      formData.append("ageRating", newAgeRating);
      formData.append("product", newGameImage);
      
      const response = await fetch("http://51.77.110.253:3001/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userObject.token}`,
          
        },
        body: formData,
      });
      
      // Process response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  }

  function getSortIcon(field) {
    if (sortBy === field) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return "";
  }

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
          <SidebarLink 
          href="/adminInventory" 
          icon={<Warehouse className="text-[#fa9a00ef]" />} 
          text="Inventory" 
          />
        </nav>
      </div>

      <div className="bg-[#1A1A22] flex-1 p-6 flex flex-col">
        <h1 className="text-white text-3xl font-bold mb-6">Game Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Games" value={games.length.toString()} icon={<Gamepad2 />} />
          <StatCard title="In Stock" value={inStockCount.toString()} icon={<Tag />} />
          <StatCard 
            title="Low Stock" 
            value={lowStockCount.toString()} 
            icon={<AlertTriangle />} 
            className={lowStockCount > 0 ? "border-yellow-500" : ""}
          />
          <StatCard title="Inventory Value" value={`£${totalValue.toFixed(2)}`} icon={<ShoppingCart />} />
        </div>

        {/* Games Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Game Catalog</h2>
              <p className="text-gray-400 text-sm">Manage your game inventory</p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center space-x-2 bg-[#3A3A4A] px-4 py-2 rounded-full">
                <SearchCode className="text-[#fa9a00ef]" />
                <input
                  type="text"
                  placeholder="Search for games..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="bg-transparent text-white focus:outline-none"
                />
              </div>
              
              <button 
                onClick={() => setShowAddGamePopup(true)} 
                className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Game
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center mb-6 border-b border-[#3A3A4A] pb-3">
            <div className="flex space-x-1">
              <button 
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('all')}
              >
                All Games ({games.length})
              </button>
              <button 
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeFilter === 'inStock' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('inStock')}
              >
                In Stock ({inStockCount})
              </button>
              <button 
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeFilter === 'outOfStock' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('outOfStock')}
              >
                Out of Stock ({games.length - inStockCount})
              </button>
              <button 
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeFilter === 'lowStock' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('lowStock')}
              >
                Low Stock ({lowStockCount})
              </button>
            </div>
            
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select 
                className="bg-[#3A3A4A] text-white text-sm rounded-lg px-3 py-1.5 border-none focus:outline-none"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="releaseYear">Release Year</option>
                <option value="stock">Stock</option>
              </select>
              <button 
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                className="bg-[#3A3A4A] text-white p-1.5 rounded-lg hover:bg-[#4A4A5A] transition-colors"
                title={sortDirection === "asc" ? "Sort Descending" : "Sort Ascending"}
              >
                <ArrowUpDown size={16} className={sortDirection === "asc" ? "" : "rotate-180"} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fa9a00ef]"></div>
            </div>
          ) : (
            <>
              {sortedGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedGames.map((game) => (
                    <div
                      key={game.id}
                      className={`bg-[#1A1A22] border ${
                        game.stock <= 0 || game.stockStatus === "OUT_OF_STOCK" 
                          ? "border-red-500/50" 
                          : game.stock < 5 && game.stockStatus === "IN_STOCK" 
                            ? "border-yellow-500/50" 
                            : "border-[#3A3A4A]"
                      } text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all`}
                    >
                      <div className="relative group">
                        <img
                          src={game.imageUrls?.[0] || "/api/placeholder/400/200"}
                          alt={game.title}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md">
                          <button
                            onClick={() => handleEditClick(game)}
                            className="bg-[#fa9a00ef] text-white p-2 rounded-full mx-1"
                            title="Edit Game"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                        <div className="absolute top-2 right-2 bg-[#252530] px-2 py-1 rounded-md text-xs font-semibold">
                          {game.releaseYear || "N/A"}
                        </div>
                        {game.rating && (
                          <div className="absolute top-2 left-2 bg-[#252530] px-2 py-1 rounded-md text-xs font-semibold flex items-center">
                            <Star size={12} className="text-[#fa9a00ef] mr-1" />
                            {game.rating}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold line-clamp-1">{game.title}</h3>
                      
                      <div className="flex justify-between items-center mt-1 mb-2">
                        <p className="text-sm text-gray-400 flex items-center">
                          <Bookmark size={12} className="mr-1" />
                          {game.genre?.name || "No Genre"}
                        </p>
                        <p className="text-sm bg-[#3A3A4A] px-2 py-1 rounded text-white">
                          {game.ageRating || "N/A"}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 text-sm">
                        <span className="text-gray-400">Stock:</span>
                        {gameStatus(game)}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-bold text-white">£{game.price}</p>
                        <button
                          className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-1 px-4 rounded-lg text-sm transition-colors"
                          onClick={() => handleEditClick(game)} 
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Gamepad2 size={48} className="text-[#3A3A4A] mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">No games found</h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm || activeFilter !== 'all' ? 'No games match your filters.' : 'Start by adding games to your catalog.'}
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("all");
                      if (games.length === 0) {
                        setShowAddGamePopup(true);
                      }
                    }}
                    className="bg-[#fa9a00ef] hover:bg-[#e08800] px-6 py-2 text-white rounded-full font-medium transition-all duration-300 inline-flex items-center gap-2"
                  >
                    {games.length === 0 ? (
                      <>
                        <Plus size={16} />
                        Add Game
                      </>
                    ) : (
                      <>
                        <Filter size={16} />
                        Clear Filters
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Edit Game Popup */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-[500px] text-white max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Game</h2>
            
            <div className="flex gap-4 mb-6">
              <img 
                src={selectedGame.imageUrls?.[0] || "/api/placeholder/400/200"} 
                alt={selectedGame.title} 
                className="w-24 h-24 object-cover rounded-lg" 
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{selectedGame.title}</h3>
                <p className="text-sm text-gray-400">ID: {selectedGame.id}</p>
                <div className="flex items-center mt-2">
                  <Tag size={14} className="text-[#fa9a00ef] mr-1" />
                  <span className="text-sm">{gameStatus(selectedGame)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={updateGame}>
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
                  step="0.01"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={editGamePrice}
                  onChange={(e) => setEditGamePrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white min-h-[80px]"
                  value={editGameDesc}
                  onChange={(e) => setEditGameDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Genre</label>
                <select
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={editGameGenre}
                  onChange={(e) => setEditGameGenre(e.target.value)}
                >
                  <option value="">Select Genre</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Stock</label>
                <input
                  type="number"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={selectedGame.stock || 0}
                  onChange={(e) => {
                    const stockValue = parseInt(e.target.value) || 0;
                    setSelectedGame({
                      ...selectedGame,
                      stock: stockValue,
                      stockStatus: stockValue <= 0 ? "OUT_OF_STOCK" : "IN_STOCK"
                    });
                  }}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {parseInt(selectedGame.stock) <= 0 
                    ? "Stock set to 0 (Out of Stock)" 
                    : parseInt(selectedGame.stock) < 5 
                      ? "Low stock warning will be shown" 
                      : "Stock level is good"}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Age Rating</label>
                <select
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={selectedGame.ageRating || ""}
                  onChange={(e) => {
                    setSelectedGame({
                      ...selectedGame,
                      ageRating: e.target.value
                    });
                  }}
                >
                  <option value="">Select Age Rating</option>
                  <option value="3">3</option>
                  <option value="7">7</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                </select>
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
      )}{/* Add Game Popup */}
      {showAddGamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-[500px] text-white max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Add New Game</h2>
            <form onSubmit={addGame}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white min-h-[80px]"
                  value={newGameDescription}
                  onChange={(e) => setNewGameDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                    value={newGamePrice}
                    onChange={(e) => setNewGamePrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                    value={newGameRating}
                    onChange={(e) => setNewGameRating(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-300">Age Rating</label>
                  <select
                    className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                    value={newAgeRating}
                    onChange={(e) => setNewAgeRating(e.target.value)}
                  >
                    <option value="">Select Age Rating</option>
                    <option value="THREE">3</option>
                    <option value="SEVEN">7</option>
                    <option value="TWELVE">12</option>
                    <option value="SIXTEEN">16</option>
                    <option value="EIGHTEEN">18</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Genre</label>
                <select
                  className="w-full bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-2 text-white"
                  value={newGameGenreId}
                  onChange={(e) => setNewGameGenreId(e.target.value)}
                  required
                >
                  <option value="">Select Genre</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Image</label>
                <div className="border-dashed border-2 border-[#3A3A4A] rounded-lg p-4 text-center cursor-pointer hover:border-[#fa9a00ef] transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    id="game-image"
                    onChange={(e) => setNewGameImage(e.target.files[0])}
                  />
                  <label htmlFor="game-image" className="cursor-pointer">
                    {newGameImage ? (
                      <div className="text-sm text-gray-300">
                        <p className="font-medium text-white">Selected: {newGameImage.name}</p>
                        <p>Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <Plus size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">Click to upload game image</p>
                      </div>
                    )}
                  </label>
                </div>
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

// Stats Card Component 
function StatCard({ title, value, icon, className = "" }) {
  return (
    <div className={`bg-[#252530] border border-[#3A3A4A] text-white p-4 rounded-xl shadow-md flex items-center space-x-4 ${className}`}>
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

export default AdminGames;
