import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { name: "Articles", path: "/articles" },
        { name: "Projects", path: "/projects" },
        { name: "Videos", path: "/videos" },
        { name: "Notes", path: "/notes" },
        { name: "Coaching", path: "/coaching" }
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-900 hover:text-primary-link transition-colors">
                    Raghav Kalyan
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            className={({ isActive }) => 
                                `text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium ${isActive ? 'text-primary-button' : ''}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden text-gray-600 hover:text-primary-link focus:outline-none focus:ring-2 focus:ring-primary-link rounded p-1"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <nav className="px-6 pt-2 pb-4 flex flex-col space-y-1">
                        {navLinks.map(link => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="text-gray-700 hover:text-primary-button py-2 px-3 rounded-md hover:bg-gray-50 transition-colors font-medium" 
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header; 