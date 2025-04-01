
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 25,
    occupation: "Software Engineer",
    compatibility: 92,
    bio: "I'm a software engineer who enjoys hiking and cooking on weekends. Looking for a clean and respectful roommate.",
    image: "https://i.pravatar.cc/150?img=1",
    matchDetails: [
      { category: "Budget", match: 95 },
      { category: "Location", match: 90 },
      { category: "Cleanliness", match: 100 },
      { category: "Lifestyle", match: 85 },
      { category: "Schedule", match: 90 },
    ]
  },
  {
    id: 2,
    name: "Jamie Smith",
    age: 28,
    occupation: "Marketing Manager",
    compatibility: 85,
    bio: "Marketing professional who loves music and exploring the city. I'm clean, easygoing and respectful of personal space.",
    image: "https://i.pravatar.cc/150?img=2",
    matchDetails: [
      { category: "Budget", match: 80 },
      { category: "Location", match: 95 },
      { category: "Cleanliness", match: 80 },
      { category: "Lifestyle", match: 90 },
      { category: "Schedule", match: 80 },
    ]
  },
  {
    id: 3,
    name: "Taylor Reed",
    age: 24,
    occupation: "Graduate Student",
    compatibility: 78,
    bio: "I'm a grad student studying environmental science. I'm very tidy, quiet, and usually studying or reading.",
    image: "https://i.pravatar.cc/150?img=3",
    matchDetails: [
      { category: "Budget", match: 100 },
      { category: "Location", match: 70 },
      { category: "Cleanliness", match: 100 },
      { category: "Lifestyle", match: 60 },
      { category: "Schedule", match: 60 },
    ]
  }
];

const savedMatches = [
  {
    id: 4,
    name: "Jordan Patel",
    age: 30,
    occupation: "Graphic Designer",
    compatibility: 71,
    bio: "Creative designer who works from home. I enjoy movies, video games, and occasionally hosting small gatherings with friends.",
    image: "https://i.pravatar.cc/150?img=4",
    matchDetails: [
      { category: "Budget", match: 60 },
      { category: "Location", match: 90 },
      { category: "Cleanliness", match: 70 },
      { category: "Lifestyle", match: 75 },
      { category: "Schedule", match: 60 },
    ]
  },
  {
    id: 5,
    name: "Casey Morgan",
    age: 26,
    occupation: "Nurse",
    compatibility: 89,
    bio: "Healthcare professional with rotating shifts. I'm neat, quiet, and respect others' privacy and space.",
    image: "https://i.pravatar.cc/150?img=5",
    matchDetails: [
      { category: "Budget", match: 85 },
      { category: "Location", match: 90 },
      { category: "Cleanliness", match: 95 },
      { category: "Lifestyle", match: 90 },
      { category: "Schedule", match: 85 },
    ]
  }
];

type MatchCardProps = {
  match: typeof mockMatches[0];
  onSave?: () => void;
  onSkip?: () => void;
  onContact?: () => void;
  saved?: boolean;
};

const MatchCard = ({ match, onSave, onSkip, onContact, saved }: MatchCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <img src={match.image} alt={match.name} className="object-cover" />
          </Avatar>
          <div className="absolute top-4 right-4">
            <Badge className="bg-teal-500">
              {match.compatibility}% Match
            </Badge>
          </div>
          <h3 className="font-bold text-lg">{match.name}, {match.age}</h3>
          <p className="text-muted-foreground mb-4">{match.occupation}</p>
          
          <p className="text-sm text-center text-gray-600 mb-4 line-clamp-3">
            {match.bio}
          </p>
          
          <Button 
            variant="ghost" 
            className="text-sm mb-4" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Match Details"}
          </Button>
          
          {showDetails && (
            <div className="w-full mb-4 space-y-3">
              {match.matchDetails.map((detail, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{detail.category}</span>
                    <span>{detail.match}%</span>
                  </div>
                  <Progress value={detail.match} className="h-2" />
                </div>
              ))}
            </div>
          )}
          
          <div className="flex space-x-2 w-full">
            {!saved ? (
              <>
                <Button className="flex-1" size="sm" variant="outline" onClick={onSkip}>
                  <X className="mr-1 h-4 w-4" /> Skip
                </Button>
                <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="sm" onClick={onSave}>
                  <Heart className="mr-1 h-4 w-4" /> Save
                </Button>
              </>
            ) : (
              <Button className="flex-1 bg-teal-500 hover:bg-teal-600" size="sm" onClick={onContact}>
                <MessageSquare className="mr-1 h-4 w-4" /> Message
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Matches = () => {
  const [newMatches, setNewMatches] = useState(mockMatches);
  const [savedList, setSavedList] = useState(savedMatches);
  const navigate = useNavigate();
  
  const handleSaveMatch = (matchId: number) => {
    const matchToSave = newMatches.find(match => match.id === matchId);
    if (matchToSave) {
      setSavedList(prev => [...prev, matchToSave]);
      setNewMatches(prev => prev.filter(match => match.id !== matchId));
      toast({
        title: "Match saved!",
        description: `You've saved ${matchToSave.name} to your matches.`,
      });
    }
  };
  
  const handleSkipMatch = (matchId: number) => {
    setNewMatches(prev => prev.filter(match => match.id !== matchId));
    toast({
      description: "Match skipped.",
    });
  };
  
  const handleContactMatch = (matchId: number) => {
    // In a real app, this would open a conversation with the match
    toast({
      title: "Opening conversation",
      description: "You can now start chatting with your match.",
    });
    navigate("/messages");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
        
        <Tabs defaultValue="new" className="mb-6">
          <TabsList>
            <TabsTrigger value="new">
              New Matches ({newMatches.length})
            </TabsTrigger>
            <TabsTrigger value="saved">
              Saved Matches ({savedList.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="pt-6">
            {newMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newMatches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onSave={() => handleSaveMatch(match.id)}
                    onSkip={() => handleSkipMatch(match.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No new matches right now</h3>
                <p className="text-muted-foreground mb-6">
                  We're finding more compatible roommates for you. Check back soon!
                </p>
                <Button asChild>
                  <a href="/browse">Browse All Roommates</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="pt-6">
            {savedList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedList.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    saved={true}
                    onContact={() => handleContactMatch(match.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-medium mb-2">No saved matches yet</h3>
                <p className="text-muted-foreground mb-6">
                  When you find potential roommates you're interested in, save them here.
                </p>
                <Button asChild>
                  <a href="/browse">Find Roommates</a>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Matches;
