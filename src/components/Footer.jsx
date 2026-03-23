import SocialLinks from './SocialLinks';

const Footer = () => (
    <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Raghav Kalyan. All rights reserved.</p>
                <div className="flex items-center">
                    <SocialLinks />
                </div>
            </div>
        </div>
    </footer>
);

export default Footer; 