
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowRight, Check, Home, MessageSquare, Search, Shield, UserCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-teal-400 py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Find Your Perfect Roommate Match
              </h1>
              <p className="text-xl text-white opacity-90 mb-8">
                Our matching algorithm connects you with compatible roommates based on lifestyle, preferences, and budget.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                  <Link to="/signup">
                    Create Profile <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/browse">Browse Roommates</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80" 
                alt="Happy roommates" 
                className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Tell us about yourself, your preferences, and what you're looking for in a roommate.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Matched</h3>
              <p className="text-gray-600">Our algorithm finds compatible roommates based on your lifestyle and preferences.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Chat</h3>
              <p className="text-gray-600">Message your potential roommates and find the perfect living arrangement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RoommateFinder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Verified Profiles</h3>
                <p className="mt-2 text-base text-gray-500">
                  We verify all users to ensure a safe and secure roommate finding experience.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Compatibility Matching</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our algorithm matches you with roommates who share your lifestyle and preferences.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                  <Home className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Housing Options</h3>
                <p className="mt-2 text-base text-gray-500">
                  Find roommates for existing properties or team up to find a new place together.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                  <MessageSquare className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Easy Communication</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our built-in messaging system makes it easy to connect with potential roommates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-500 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to find your perfect roommate?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have found their ideal living situation through RoommateFinder.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">RoommateFinder</h3>
              <p className="text-gray-300">Finding compatible roommates made easy.</p>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQs</Link></li>
                <li><Link to="/support" className="text-gray-300 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>© {new Date().getFullYear()} RoommateFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
