
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Home className="h-6 w-6 text-teal-500 mr-2" />
                <span className="text-xl font-bold text-gray-800">RoommateFinder</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/browse" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-500">
              Browse
            </Link>
            <Link to="/matches" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-500">
              Matches
            </Link>
            <Link to="/messages" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-500">
              Messages
            </Link>
            <div className="ml-4">
              <Button asChild variant="outline" size="sm" className="mr-2">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
