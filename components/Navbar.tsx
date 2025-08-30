import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

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

                    {/* Authentication */}
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <Link
                                href="/sign-in"
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Get Started
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "h-8 w-8"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}
