"use client";

function AdminPage() {
    return (
        <div className="flex min-h-screen bg-[#1c1c1c] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-black p-6">
                <div className="text-2xl font-bold text-[#f6a302] mb-10">GameVault Admin</div>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="/dashboard"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/users"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                            >
                                Manage Users
                            </a>
                        </li>
                        <li>
                            <a
                                href="/reports"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                            >
                                Manage Games
                            </a>
                        </li>
                        <li>
                            <a
                                href="/reports"
                                className="block text-lg font-medium hover:text-[#f6a302]"
                            >
                                Reports
                            </a>
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

                {/* Recent Activities*/}
                <section>
                    <h3 className="text-xl font-bold">Recent Activities</h3>
                </section>
            </main>
        </div>
    );
}

export default AdminPage;
