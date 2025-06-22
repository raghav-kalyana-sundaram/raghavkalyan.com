import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import { getContentByType } from '../utils/content';

const RecentContentGrid = () => {
    const contentTypes = ['articles', 'projects', 'notes', 'videos'];

    return (
        <section className="bg-light-bg py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Latest Updates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contentTypes.map(type => {
                        const recentItems = getContentByType(type).slice(0, 5);
                        const title = type.charAt(0).toUpperCase() + type.slice(1);

                        return (
                            <div key={type} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent {title}</h3>
                                <div className="flex-grow">
                                    {recentItems.length > 0 ? (
                                        <ul className="space-y-3">
                                            {recentItems.map(item => (
                                                <li key={item.slug} className="truncate">
                                                    <Link 
                                                        to={`/${item.contentType}/${item.slug}`} 
                                                        className="text-primary-link hover:underline"
                                                        title={item.title}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No recent {type} found.</p>
                                    )}
                                </div>
                                <Link to={`/${type}`} className="text-primary-link hover:underline text-sm mt-6 inline-block font-semibold self-start">
                                    View all {type} →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const HomePage = () => (
    <>
        <section className="container mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 md:pr-12 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Hi, I'm Raghav Kalyan</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Welcome to my personal portfolio! I'm passionate about technology, music, and sharing knowledge. 
                        Here you'll find my latest articles, projects, notes, and videos covering various topics that interest me.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="/resume-placeholder.pdf" download className="bg-primary-button text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300">
                            Download Resume
                        </a>
                        <Link to="/coaching" className="border border-primary-button text-primary-button font-bold py-2 px-4 rounded hover:bg-primary-button hover:text-white transition duration-300">
                            Book Coaching
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/3 mt-8 md:mt-0 flex flex-col items-center">
                    <img src="/placeholder.jpg" alt="Profile Picture" className="w-48 h-48 rounded-full object-cover shadow-lg" />
                    <SocialLinks />
                </div>
            </div>
        </section>
        
        <RecentContentGrid />
    </>
);

export default HomePage; 