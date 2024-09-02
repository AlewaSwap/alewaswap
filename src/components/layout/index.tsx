// components/Layout.tsx
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Navbar */}
            <nav className="w-20 bg-gray-800 text-white flex flex-col items-center py-4">
                <div className="flex flex-col space-y-4">
                    <a href="/" className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 4 4 8-8 2 2M13 12l2-2 4 4 8-8 2 2" />
                        </svg>
                    </a>
                    <a href="/trade" className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    {/* Add more links/icons as needed */}
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100">
                <header className="bg-white shadow p-4">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </header>
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
