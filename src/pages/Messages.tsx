
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { SearchIcon, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock data for messages
const mockContacts = [
  {
    id: 1,
    name: "Alex Johnson",
    lastMessage: "Sounds good! I'd like to discuss the apartment further.",
    time: "12:30 PM",
    image: "https://i.pravatar.cc/150?img=1",
    online: true,
    unread: 2
  },
  {
    id: 2,
    name: "Jamie Smith",
    lastMessage: "When would be a good time to meet?",
    time: "Yesterday",
    image: "https://i.pravatar.cc/150?img=2",
    online: false,
    unread: 0
  },
  {
    id: 3,
    name: "Taylor Reed",
    lastMessage: "I'm interested in the room you posted.",
    time: "Yesterday",
    image: "https://i.pravatar.cc/150?img=3",
    online: true,
    unread: 0
  },
  {
    id: 4,
    name: "Jordan Patel",
    lastMessage: "Hi there! Are you still looking for a roommate?",
    time: "Monday",
    image: "https://i.pravatar.cc/150?img=4",
    online: false,
    unread: 0
  },
  {
    id: 5,
    name: "Casey Morgan",
    lastMessage: "Thanks for your message! I'd be happy to answer any questions.",
    time: "Monday",
    image: "https://i.pravatar.cc/150?img=5",
    online: true,
    unread: 0
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 1,
    text: "Hi there! I saw your profile and I'm interested in the room you posted.",
    time: "12:05 PM",
    date: "Today"
  },
  {
    id: 2,
    sender: "me",
    text: "Hey Alex! Thanks for reaching out. It's still available. What would you like to know about it?",
    time: "12:10 PM",
    date: "Today"
  },
  {
    id: 3,
    sender: 1,
    text: "I'd like to know more about the neighborhood and if utilities are included in the rent?",
    time: "12:15 PM",
    date: "Today"
  },
  {
    id: 4,
    sender: "me",
    text: "The neighborhood is very quiet and safe. It's close to public transport and there are lots of restaurants nearby. And yes, all utilities are included except for internet.",
    time: "12:20 PM",
    date: "Today"
  },
  {
    id: 5,
    sender: 1,
    text: "That's perfect! I work remotely, so good internet is important for me. Would it be possible to see the place this week?",
    time: "12:25 PM",
    date: "Today"
  },
  {
    id: 6,
    sender: "me",
    text: "Of course! I'm available Thursday evening or anytime on Saturday. Would either of those work for you?",
    time: "12:28 PM",
    date: "Today"
  },
  {
    id: 7,
    sender: 1,
    text: "Sounds good! I'd like to discuss the apartment further.",
    time: "12:30 PM",
    date: "Today"
  }
];

const Messages = () => {
  const [currentContact, setCurrentContact] = useState(mockContacts[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, we would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[70vh]">
            {/* Contacts sidebar */}
            <div className="border-r border-gray-200">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative mb-4">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search contacts"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(70vh-100px)]">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map(contact => (
                    <div key={contact.id}>
                      <div 
                        className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start ${currentContact.id === contact.id ? 'bg-gray-50' : ''}`}
                        onClick={() => setCurrentContact(contact)}
                      >
                        <div className="relative mr-3 flex-shrink-0">
                          <Avatar>
                            <img src={contact.image} alt={contact.name} />
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">{contact.name}</h3>
                            <span className="text-xs text-gray-500">{contact.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-1 pt-1">{contact.lastMessage}</p>
                        </div>
                        {contact.unread > 0 && (
                          <div className="ml-2 flex-shrink-0">
                            <span className="bg-teal-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                              {contact.unread}
                            </span>
                          </div>
                        )}
                      </div>
                      <Separator />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No contacts found
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Chat area */}
            <div className="col-span-2 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                <Avatar className="mr-3">
                  <img src={currentContact.image} alt={currentContact.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium">{currentContact.name}</h3>
                  <p className="text-xs text-gray-500">
                    {currentContact.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-grow p-4 h-[calc(70vh-180px)]">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg p-3 ${
                          message.sender === "me"
                            ? "bg-teal-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "me" ? "text-teal-100" : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="mr-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} className="bg-teal-500 hover:bg-teal-600">
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
