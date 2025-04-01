import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MessageSquare, Heart, X, Check } from "lucide-react";

// Mock data for roommate profiles
const roommates = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 25,
    occupation: "Software Engineer",
    budget: 1200,
    moveIn: "2023-12-01",
    cleanliness: 4,
    bio: "I'm a software engineer who enjoys hiking and cooking on weekends. Looking for a clean and respectful roommate.",
    compatibility: 92,
    image: "https://i.pravatar.cc/150?img=1",
    pets: "No pets",
    smoking: "Non-smoker",
    personality: "Balanced"
  },
  {
    id: 2,
    name: "Jamie Smith",
    age: 28,
    occupation: "Marketing Manager",
    budget: 1100,
    moveIn: "2023-11-15",
    cleanliness: 3,
    bio: "Marketing professional who loves music and exploring the city. I'm clean, easygoing and respectful of personal space.",
    compatibility: 85,
    image: "https://i.pravatar.cc/150?img=2",
    pets: "Cat owner",
    smoking: "Non-smoker",
    personality: "Extroverted"
  },
  {
    id: 3,
    name: "Taylor Reed",
    age: 24,
    occupation: "Graduate Student",
    budget: 950,
    moveIn: "2023-12-15",
    cleanliness: 5,
    bio: "I'm a grad student studying environmental science. I'm very tidy, quiet, and usually studying or reading.",
    compatibility: 78,
    image: "https://i.pravatar.cc/150?img=3",
    pets: "No pets",
    smoking: "Non-smoker",
    personality: "Introverted"
  },
  {
    id: 4,
    name: "Jordan Patel",
    age: 30,
    occupation: "Graphic Designer",
    budget: 1350,
    moveIn: "2023-11-20",
    cleanliness: 3,
    bio: "Creative designer who works from home. I enjoy movies, video games, and occasionally hosting small gatherings with friends.",
    compatibility: 71,
    image: "https://i.pravatar.cc/150?img=4",
    pets: "Dog owner",
    smoking: "Outdoor smoker",
    personality: "Balanced"
  },
  {
    id: 5,
    name: "Casey Morgan",
    age: 26,
    occupation: "Nurse",
    budget: 1050,
    moveIn: "2023-12-10",
    cleanliness: 4,
    bio: "Healthcare professional with rotating shifts. I'm neat, quiet, and respect others' privacy and space.",
    compatibility: 89,
    image: "https://i.pravatar.cc/150?img=5",
    pets: "No pets",
    smoking: "Non-smoker",
    personality: "Introverted"
  },
  {
    id: 6,
    name: "Riley Chen",
    age: 29,
    occupation: "Financial Analyst",
    budget: 1300,
    moveIn: "2023-11-25",
    cleanliness: 4,
    bio: "Finance professional who enjoys cooking and fitness. Looking for a clean and organized living environment.",
    compatibility: 82,
    image: "https://i.pravatar.cc/150?img=6",
    pets: "No pets",
    smoking: "Non-smoker",
    personality: "Balanced"
  }
];

const Browse = () => {
  const [filters, setFilters] = useState({
    budget: [500, 2000],
    cleanliness: [1, 5],
    moveInDate: "",
    hasPets: "",
    smoking: "",
    personality: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Filter roommates based on current filters and search term
  const filteredRoommates = roommates.filter(roommate => {
    const matchesSearch = roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         roommate.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roommate.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBudget = roommate.budget >= filters.budget[0] && roommate.budget <= filters.budget[1];
    const matchesCleanliness = roommate.cleanliness >= filters.cleanliness[0] && roommate.cleanliness <= filters.cleanliness[1];
    
    const matchesPets = filters.hasPets ? 
      (filters.hasPets === "yes" ? roommate.pets.includes("owner") : roommate.pets === "No pets") : 
      true;
    
    const matchesSmoking = filters.smoking ? 
      (filters.smoking === "yes" ? roommate.smoking.includes("smoker") : roommate.smoking === "Non-smoker") : 
      true;
    
    const matchesPersonality = filters.personality ? 
      roommate.personality.toLowerCase() === filters.personality.toLowerCase() : 
      true;
    
    return matchesSearch && matchesBudget && matchesCleanliness && matchesPets && matchesSmoking && matchesPersonality;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Find Roommates</h1>
          <div className="w-full md:w-auto flex items-center">
            <div className="relative w-full md:w-[300px] mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name, occupation..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="mr-2" size={18} />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Budget Range (${filters.budget[0]} - ${filters.budget[1]})</Label>
                  <Slider
                    min={500}
                    max={3000}
                    step={50}
                    defaultValue={filters.budget}
                    onValueChange={(value) => handleFilterChange("budget", value)}
                    className="mt-6"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Cleanliness Level ({filters.cleanliness[0]} - {filters.cleanliness[1]})</Label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={filters.cleanliness}
                    onValueChange={(value) => handleFilterChange("cleanliness", value)}
                    className="mt-6"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Move-in Date</Label>
                  <Input 
                    type="date" 
                    value={filters.moveInDate}
                    onChange={(e) => handleFilterChange("moveInDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pets</Label>
                  <Select 
                    value={filters.hasPets} 
                    onValueChange={(value) => handleFilterChange("hasPets", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Has pets</SelectItem>
                      <SelectItem value="no">No pets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Smoking</Label>
                  <Select 
                    value={filters.smoking} 
                    onValueChange={(value) => handleFilterChange("smoking", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Smoker</SelectItem>
                      <SelectItem value="no">Non-smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Personality</Label>
                  <Select 
                    value={filters.personality} 
                    onValueChange={(value) => handleFilterChange("personality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="introverted">Introverted</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="extroverted">Extroverted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setFilters({
                    budget: [500, 2000],
                    cleanliness: [1, 5],
                    moveInDate: "",
                    hasPets: "",
                    smoking: "",
                    personality: ""
                  })}
                >
                  Reset Filters
                </Button>
                <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.length > 0 ? (
            filteredRoommates.map(roommate => (
              <Card key={roommate.id} className="overflow-hidden">
                <div className="relative pb-2/3">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-teal-500">
                      {roommate.compatibility}% Match
                    </Badge>
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <img src={roommate.image} alt={roommate.name} />
                    </Avatar>
                    <h3 className="font-bold text-lg">{roommate.name}, {roommate.age}</h3>
                    <p className="text-muted-foreground">{roommate.occupation}</p>
                    
                    <div className="w-full mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">${roommate.budget}/month</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Move-in:</span>
                        <span className="font-medium">{new Date(roommate.moveIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Cleanliness:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-2 rounded-full mx-0.5 ${
                                i < roommate.cleanliness ? 'bg-teal-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3 mb-4">
                      <Badge variant="secondary">{roommate.pets}</Badge>
                      <Badge variant="secondary">{roommate.smoking}</Badge>
                      <Badge variant="secondary">{roommate.personality}</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{roommate.bio}</p>
                    
                    <div className="flex space-x-2 w-full">
                      <Button className="flex-1" size="sm" variant="outline">
                        <X className="mr-1 h-4 w-4" /> Skip
                      </Button>
                      <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" /> Contact
                      </Button>
                      <Button className="w-10 h-10 p-0 rounded-full" variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">No roommates found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Try adjusting your filters or search criteria to find more potential roommates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
