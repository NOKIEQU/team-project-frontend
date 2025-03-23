"use client";

import {
  LayoutDashboard,
  Gamepad2,
  Layers,
  Users,
  SearchCode,
  ShoppingCart,
  Activity,
  Tag,
  Package,
  Plus,
  Minus,
  AlertTriangle,
  Save,
  ArrowUpDown,
  Filter,
  Warehouse,
  PlusCircle,
  Menu,
  X
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminInventory() {
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStockQuantity, setNewStockQuantity] = useState(0);
  const [showStockModal, setShowStockModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (userObject && userObject.token) {
        setIsLoading(true);
        try {
          // Fetch product data
          const productsResponse = await fetch("http://51.77.110.253:3001/api/products", {
            headers: {
              Authorization: `Bearer ${userObject.token}`,
            },
          });
          
          if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            setProducts(productsData);
          } else {
            console.error("Failed to fetch products:", productsResponse.statusText);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isUserLoaded) {
      fetchProducts();
    }
  }, [isUserLoaded, userObject]);

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

  const openStockModal = (product) => {
    setSelectedProduct(product);
    setNewStockQuantity(parseInt(product.stock) || 0);
    setShowStockModal(true);
    setUpdateStatus({ loading: false, success: null, error: null });
  };

  const closeStockModal = () => {
    setShowStockModal(false);
    setSelectedProduct(null);
  };

  const updateStock = async () => {
    if (!selectedProduct || !userObject || !userObject.token) return;

    setUpdateStatus({ loading: true, success: null, error: null });
    
    if (newStockQuantity < 0) {
      setUpdateStatus({ 
        loading: false, 
        success: null, 
        error: "Stock cannot be negative. Please adjust the quantity." 
      });
      return;
    }

    try {
      const response = await fetch(`http://51.77.110.253:3001/api/inventory/updateStock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userObject.token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
          quantity: newStockQuantity
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        
        setProducts(products.map(p => 
          p.id === selectedProduct.id ? {
            ...p,
            stock: newStockQuantity,
            stockStatus: newStockQuantity === 0 ? "OUT_OF_STOCK" : "IN_STOCK"
          } : p
        ));
        
        setUpdateStatus({ 
          loading: false, 
          success: `Successfully updated stock for ${selectedProduct.title}`,
          error: null 
        });
        
        setTimeout(() => {
          closeStockModal();
        }, 1500);
      } else {
        const errorData = await response.json();
        setUpdateStatus({ 
          loading: false, 
          success: null, 
          error: errorData.error || "Failed to update stock. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      setUpdateStatus({ 
        loading: false, 
        success: null, 
        error: "An error occurred while updating stock. Please try again." 
      });
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch(activeFilter) {
      case "all":
        return matchesSearch;
      case "inStock":
        return matchesSearch && product.stockStatus === "IN_STOCK";
      case "outOfStock":
        return matchesSearch && product.stockStatus === "OUT_OF_STOCK";
      case "lowStock":
        return matchesSearch && product.stockStatus === "IN_STOCK" && (parseInt(product.stock) < 5);
      default:
        return matchesSearch;
    }
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch(sortBy) {
      case "title":
        comparison = a.title?.localeCompare(b.title);
        break;
      case "stock":
        comparison = (parseInt(a.stock) || 0) - (parseInt(b.stock) || 0);
        break;
      case "price":
        comparison = (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        break;
      default:
        comparison = a.title?.localeCompare(b.title);
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.stockStatus === "IN_STOCK").length;
  const outOfStockCount = products.filter(p => p.stockStatus === "OUT_OF_STOCK").length;
  const lowStockCount = products.filter(p => p.stockStatus === "IN_STOCK" && (parseInt(p.stock) < 5)).length;
  const totalInventoryItems = products.reduce((sum, p) => sum + (parseInt(p.stock) || 0), 0);

  const getStockClass = (product) => {
    if (!product.stock || product.stockStatus === "OUT_OF_STOCK") {
      return "text-red-500";
    } else if (parseInt(product.stock) < 5) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

  const getStockBadge = (product) => {
    if (!product.stock || product.stockStatus === "OUT_OF_STOCK") {
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-500">Out of Stock</span>;
    } else if (parseInt(product.stock) < 5) {
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-500">Low Stock ({product.stock})</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-500">In Stock ({product.stock})</span>;
    }
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0F0F15] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button 
          onClick={toggleMobileSidebar}
          className="text-white p-2 rounded-lg hover:bg-[#2A2A35] transition-colors"
        >
          {showMobileSidebar ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${showMobileSidebar ? 'block' : 'hidden'} md:block bg-[#0F0F15] text-white w-full md:w-64 flex-shrink-0 flex flex-col p-5 space-y-4 border-r border-[#2A2A35] h-full md:h-auto ${showMobileSidebar ? 'absolute z-20 top-14 left-0 right-0 bottom-0' : ''}`}>
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

      {/* Main Content */}
      <div className="bg-[#1A1A22] flex-1 p-4 md:p-6">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">Inventory Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
          <StatCard title="Total Products" value={totalProducts.toString()} icon={<Package />} />
          <StatCard title="Total Items" value={totalInventoryItems.toString()} icon={<Warehouse />} />
          <StatCard 
            title="Out of Stock" 
            value={outOfStockCount.toString()} 
            icon={<AlertTriangle />} 
            className={outOfStockCount > 0 ? "border-red-500/50" : ""}
          />
          <StatCard 
            title="Low Stock" 
            value={lowStockCount.toString()} 
            icon={<Tag />} 
            className={lowStockCount > 0 ? "border-yellow-500/50" : ""}
          />
        </div>

        {/* Inventory Table Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-white">Stock Levels</h2>
              <p className="text-gray-400 text-xs md:text-sm">View and update product inventory</p>
            </div>

            {/* Search Input */}
            <div className="flex items-center space-x-2 bg-[#3A3A4A] px-3 py-2 rounded-full w-full sm:w-auto">
              <SearchCode className="text-[#fa9a00ef]" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent text-white focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center mb-6 border-b border-[#3A3A4A] pb-3">
            <div className="flex flex-wrap gap-1 mb-2 sm:mb-0">
              <button 
                className={`px-3 py-1.5 rounded-t-lg text-xs md:text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('all')}
              >
                All Products ({totalProducts})
              </button>
              <button 
                className={`px-3 py-1.5 rounded-t-lg text-xs md:text-sm font-medium transition-colors ${activeFilter === 'inStock' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('inStock')}
              >
                In Stock ({inStockCount})
              </button>
              <button 
                className={`px-3 py-1.5 rounded-t-lg text-xs md:text-sm font-medium transition-colors ${activeFilter === 'outOfStock' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('outOfStock')}
              >
                Out of Stock ({outOfStockCount})
              </button>
              <button 
                className={`px-3 py-1.5 rounded-t-lg text-xs md:text-sm font-medium transition-colors ${activeFilter === 'lowStock' ? 'bg-[#3A3A4A] text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveFilter('lowStock')}
              >
                Low Stock ({lowStockCount})
              </button>
            </div>
            
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-gray-400 text-xs md:text-sm">Sort by:</span>
              <select 
                className="bg-[#3A3A4A] text-white text-xs md:text-sm rounded-lg px-2 py-1.5 border-none focus:outline-none"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="stock">Stock Level</option>
                <option value="price">Price</option>
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
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#3A3A4A]">
                      <th className="text-left p-3 text-gray-400">Product</th>
                      <th className="text-left p-3 text-gray-400">ID</th>
                      <th className="text-center p-3 text-gray-400">Price</th>
                      <th className="text-center p-3 text-gray-400">Stock Level</th>
                      <th className="text-center p-3 text-gray-400">Status</th>
                      <th className="text-center p-3 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProducts.length > 0 ? (
                      sortedProducts.map((product) => (
                        <tr key={product.id} className="border-b border-[#3A3A4A] hover:bg-[#3A3A4A]/30">
                          <td className="p-3 text-white">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-[#3A3A4A] rounded-md mr-3 flex-shrink-0 overflow-hidden">
                                {product.imageUrls && product.imageUrls[0] ? (
                                  <img 
                                    src={product.imageUrls[0]} 
                                    alt={product.title} 
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-[#fa9a00ef]">
                                    <Gamepad2 size={20} />
                                  </div>
                                )}
                              </div>
                              <span className="font-medium">{product.title}</span>
                            </div>
                          </td>
                          <td className="p-3 text-gray-400">{product.id}</td>
                          <td className="p-3 text-white text-center font-medium">£{parseFloat(product.price).toFixed(2)}</td>
                          <td className="p-3 text-center">
                            <span className={`font-bold ${getStockClass(product)}`}>
                              {product.stock || 0}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {getStockBadge(product)}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => openStockModal(product)}
                              className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
                            >
                              <PlusCircle size={14} />
                              Update Stock
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center p-6 text-gray-400">
                          No products found matching the search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <div key={product.id} className="bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-4">
                      <div className="flex items-start mb-3">
                        <div className="h-12 w-12 bg-[#3A3A4A] rounded-md mr-3 flex-shrink-0 overflow-hidden">
                          {product.imageUrls && product.imageUrls[0] ? (
                            <img 
                              src={product.imageUrls[0]} 
                              alt={product.title} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[#fa9a00ef]">
                              <Gamepad2 size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{product.title}</h3>
                          <p className="text-gray-400 text-xs">ID: {product.id}</p>
                        </div>
                        <span className="bg-[#252530] text-white rounded-lg px-2 py-1 text-sm font-medium">
                          £{parseFloat(product.price).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-gray-400 mb-1">Stock Status:</div>
                          {getStockBadge(product)}
                        </div>
                        <button
                          onClick={() => openStockModal(product)}
                          className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
                        >
                          <PlusCircle size={14} />
                          Update
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-gray-400">
                    No products found matching the search criteria.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Update Stock Modal */}
      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252530] border border-[#3A3A4A] p-5 rounded-lg shadow-lg w-full max-w-[450px] text-white relative">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Warehouse className="text-[#fa9a00ef] mr-2" size={20} />
              Update Stock
            </h2>
            
            <div className="mb-5">
              <div className="flex items-center mb-3">
                <div className="h-12 w-12 bg-[#3A3A4A] rounded-md mr-3 flex-shrink-0 overflow-hidden">
                  {selectedProduct.imageUrls && selectedProduct.imageUrls[0] ? (
                    <img 
                      src={selectedProduct.imageUrls[0]} 
                      alt={selectedProduct.title} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[#fa9a00ef]">
                      <Gamepad2 size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{selectedProduct.title}</h3>
                  <p className="text-xs text-gray-400">ID: {selectedProduct.id}</p>
                </div>
              </div>
              
              <div className="bg-[#1A1A22] border border-[#3A3A4A] p-3 rounded-lg flex justify-between items-center mb-4">
                <span className="text-gray-400">Current Stock:</span>
                <span className={`font-bold ${getStockClass(selectedProduct)}`}>
                  {selectedProduct.stock || 0}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Stock Quantity:</label>
                <div className="flex">
                  <button 
                    className="bg-[#1A1A22] border border-[#3A3A4A] rounded-l-lg px-3 py-2 hover:bg-[#3A3A4A]"
                    onClick={() => {
                      if (newStockQuantity > 0) {
                        setNewStockQuantity(prev => parseInt(prev) - 1);
                      }
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number"
                    value={newStockQuantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        setNewStockQuantity(val);
                      }
                    }}
                    className="w-full bg-[#1A1A22] border-y border-[#3A3A4A] text-center text-white focus:outline-none"
                  />
                  <button 
                    className="bg-[#1A1A22] border border-[#3A3A4A] rounded-r-lg px-3 py-2 hover:bg-[#3A3A4A]"
                    onClick={() => {
                      setNewStockQuantity(prev => parseInt(prev) + 1);
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Set the total quantity that should be in stock
                </p>
              </div>
              
              <div className="bg-[#1A1A22] border border-[#3A3A4A] p-3 rounded-lg flex justify-between items-center mt-4">
                <span className="text-gray-400">Stock Status:</span>
                <span className={`font-bold ${
                  newStockQuantity <= 0 
                    ? "text-red-500" 
                    : newStockQuantity < 5 
                      ? "text-yellow-500" 
                      : "text-green-500"
                }`}>
                  {newStockQuantity <= 0 ? "Out of Stock" : newStockQuantity < 5 ? "Low Stock" : "In Stock"}
                </span>
              </div>
              
              {/* Status message */}
              {updateStatus.error && (
                <div className="mt-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm">
                  {updateStatus.error}
                </div>
              )}
              
              {updateStatus.success && (
                <div className="mt-4 p-3 bg-green-500/20 text-green-500 rounded-lg text-sm">
                  {updateStatus.success}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={closeStockModal}
                disabled={updateStatus.loading}
              >
                Cancel
              </button>
              <button
                className="bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-2 px-4 rounded-lg transition-colors flex items-center"
                onClick={updateStock}
                disabled={updateStatus.loading || newStockQuantity === parseInt(selectedProduct.stock)}
              >
                {updateStatus.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Update Stock
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stats Card Component 
function StatCard({ title, value, icon, className = "" }) {
  return (
    <div className={`bg-[#252530] border border-[#3A3A4A] text-white p-3 md:p-4 rounded-xl shadow-md flex items-center space-x-3 md:space-x-4 ${className}`}>
      {/* Icon */}
      <div className="bg-[#3A3A4A] p-3 md:p-4 rounded-full text-xl md:text-3xl text-[#fa9a00ef]">
        {icon}
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">{value}</h3>
        <p className="text-xs md:text-sm font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default AdminInventory;