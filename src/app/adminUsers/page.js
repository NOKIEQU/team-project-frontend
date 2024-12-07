"use client";
import Link from "next/link";

function Users() {
    return (
        <div className="flex min-h-screen bg-[#1c1c1c] text-white">
    
            {/* Sidebar */}
            <aside className="w-64 bg-black p-6">
                <div className="text-2xl font-bold text-[#f6a302] mb-10">GameVault Admin</div>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="/admin"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                        <Link
                        
                                href="/adminusers"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                        >
                                Manage Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/reports"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                            >
                                Manage Games
                            </Link>
                        </li>
                     
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                </div>

                {/* Quick Stats*/}
                <section className="mb-8">
                    <h3 className="text-xl font-bold mb-6">Quick Stats</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
                            <h4 className="text-lg font-bold">Total Revenue</h4>
                            <p className="text-4xl font-bold text-[#f6a302]">£0</p>
                        </div>
                        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
                            <h4 className="text-lg font-bold">Orders</h4>
                            <p className="text-4xl font-bold text-[#f6a302]">0</p>
                        </div>
                        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
                            <h4 className="text-lg font-bold">Total Users</h4>
                            <p className="text-4xl font-bold text-[#f6a302]">0</p>
                        </div>
                        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
                            <h4 className="text-lg font-bold">Active Users</h4>
                            <p className="text-4xl font-bold text-[#f6a302]">0</p>
                        </div>
                    </div>
                </section>

           
                 {/* User table */}
<section>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-centre  text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Avatar
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-centre text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Username
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-centre text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-centre text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Games Purchased
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-centre text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
        </tr>
    
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
        </tr>
 
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
        </tr>
   
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
        </tr>
    
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
        </tr>
  
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
            </main>
        </div>
    );
}

export default Users;
