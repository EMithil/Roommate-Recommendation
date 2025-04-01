import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";

const ProfileCreate = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic info
    age: "",
    gender: "",
    occupation: "",
    bio: "",
    
    // Preferences
    budget: 1000,
    roommates: "1",
    moveInDate: "",
    duration: "6",
    
    // Lifestyle
    cleanliness: 3,
    smoking: "no",
    pets: "no",
    guestFrequency: "sometimes",
    workSchedule: "day",
    personality: "balanced"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSliderChange = (id: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [id]: value[0]
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate profile creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile created successfully",
        description: "You can now start finding potential roommates!",
      });
      // In a real app, we would navigate to the dashboard or matches page
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Profile</CardTitle>
            <CardDescription>
              Complete your profile to find the perfect roommate match
            </CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>1</div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-teal-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>2</div>
                <div className={`w-16 h-1 ${step === 3 ? 'bg-teal-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>3</div>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {step === 1 && (
                <>
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          type="number" 
                          placeholder="25" 
                          value={formData.age}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={formData.gender} 
                          onValueChange={(value) => handleSelectChange("gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="nonbinary">Non-binary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input 
                        id="occupation" 
                        placeholder="Software Engineer, Student, etc." 
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell potential roommates about yourself..." 
                        className="min-h-[100px]"
                        value={formData.bio}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="text-lg font-medium">Housing Preferences</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Monthly Budget ($ {formData.budget})</Label>
                      <Slider 
                        id="budget"
                        min={500} 
                        max={5000} 
                        step={100} 
                        defaultValue={[formData.budget]} 
                        onValueChange={(value) => handleSliderChange("budget", value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="roommates">Preferred # of Roommates</Label>
                        <Select 
                          value={formData.roommates} 
                          onValueChange={(value) => handleSelectChange("roommates", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 roommate</SelectItem>
                            <SelectItem value="2">2 roommates</SelectItem>
                            <SelectItem value="3">3 roommates</SelectItem>
                            <SelectItem value="4+">4+ roommates</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Stay Duration</Label>
                        <Select 
                          value={formData.duration} 
                          onValueChange={(value) => handleSelectChange("duration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 months</SelectItem>
                            <SelectItem value="6">6 months</SelectItem>
                            <SelectItem value="12">1 year</SelectItem>
                            <SelectItem value="18+">18+ months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                      <Input 
                        id="moveInDate" 
                        type="date" 
                        value={formData.moveInDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="text-lg font-medium">Lifestyle & Preferences</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cleanliness">Cleanliness Level (1-5)</Label>
                      <Slider 
                        id="cleanliness"
                        min={1} 
                        max={5} 
                        step={1} 
                        defaultValue={[formData.cleanliness]} 
                        onValueChange={(value) => handleSliderChange("cleanliness", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Relaxed</span>
                        <span>Very Neat</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smoking">Smoking Preference</Label>
                      <RadioGroup 
                        value={formData.smoking} 
                        onValueChange={(value) => handleSelectChange("smoking", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="smoking-yes" />
                          <Label htmlFor="smoking-yes">Smoker friendly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="outside" id="smoking-outside" />
                          <Label htmlFor="smoking-outside">Outside only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="smoking-no" />
                          <Label htmlFor="smoking-no">No smoking</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pets">Pet Preference</Label>
                      <Select 
                        value={formData.pets} 
                        onValueChange={(value) => handleSelectChange("pets", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Pet owner / Pet friendly</SelectItem>
                          <SelectItem value="small">Small pets only</SelectItem>
                          <SelectItem value="no">No pets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="personality">Your Personality Type</Label>
                      <RadioGroup 
                        value={formData.personality} 
                        onValueChange={(value) => handleSelectChange("personality", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="introverted" id="personality-introverted" />
                          <Label htmlFor="personality-introverted">Introverted (prefer quiet)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="balanced" id="personality-balanced" />
                          <Label htmlFor="personality-balanced">Balanced (mix of social and alone time)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="extroverted" id="personality-extroverted" />
                          <Label htmlFor="personality-extroverted">Extroverted (social and outgoing)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Profile..." : "Complete Profile"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreate;
