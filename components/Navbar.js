import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="text-2xl font-bold text-gray-900">
                                Creator<span className="text-blue-600">ML</span>
                            </div>
                        </Link>
                    </div>

                    {/* Sign In Button */}
                    <div className="flex items-center">
                        <Link
                            href="/dashboard"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
