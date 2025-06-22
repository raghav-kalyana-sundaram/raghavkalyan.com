import { useState } from 'react';

const CoachingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Chess Coaching</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ready to elevate your chess game? I offer personalized coaching sessions for players of all levels, 
                        from beginners to advanced players looking to improve their strategic thinking and tactical skills.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Coaching Information */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">What I Offer</h2>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-primary-button mr-3">✓</span>
                                    <span>Personalized training plans based on your skill level</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-button mr-3">✓</span>
                                    <span>Game analysis and strategic improvement</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-button mr-3">✓</span>
                                    <span>Opening repertoire development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-button mr-3">✓</span>
                                    <span>Endgame technique and calculation training</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-button mr-3">✓</span>
                                    <span>Tournament preparation and mental game coaching</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Session Details</h3>
                            <div className="space-y-2 text-gray-600">
                                <p><strong>Duration:</strong> 60-90 minutes per session</p>
                                <p><strong>Format:</strong> Online via Zoom or in-person (local area)</p>
                                <p><strong>Pricing:</strong> $75-150 per session (varies by level)</p>
                                <p><strong>Availability:</strong> Weekdays and weekends</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Get Started</h2>
                        
                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                Thank you for your interest! I'll get back to you within 24 hours.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                    Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-link focus:border-transparent" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                    Email *
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-link focus:border-transparent" 
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                                    Message
                                </label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows="4" 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Tell me about your chess experience and what you'd like to work on..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-link focus:border-transparent"
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-primary-button text-white font-bold py-3 px-6 rounded hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachingPage; 