import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save } from "lucide-react";

interface SchoolClosureForm {
  schoolName: string;
  district: string;
  village: string;
  yearOfClosure: string;
  reasonForClosure: string;
  studentsBeforeClosure: string;
  whereStudentsGo: string;
  communityOpinion: string;
}

const reasons = [
  "Low student enrollment",
  "Lack of teachers",
  "Poor infrastructure",
  "School merger policy",
  "Financial constraints",
  "Natural disaster damage",
  "Accessibility issues",
  "Government policy change",
  "Community migration",
  "Other"
];

const maharashtraDistricts = [
  "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", 
  "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", 
  "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", 
  "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", 
  "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", 
  "Washim", "Yavatmal"
];

export default function AddData() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SchoolClosureForm>({
    schoolName: "",
    district: "",
    village: "",
    yearOfClosure: "",
    reasonForClosure: "",
    studentsBeforeClosure: "",
    whereStudentsGo: "",
    communityOpinion: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof SchoolClosureForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.schoolName || !formData.district || !formData.village || 
        !formData.yearOfClosure || !formData.reasonForClosure || 
        !formData.studentsBeforeClosure || !formData.whereStudentsGo) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const year = parseInt(formData.yearOfClosure);
    if (year < 2020 || year > 2025) {
      toast({
        title: "Invalid year",
        description: "Year of closure must be between 2020 and 2025",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const students = parseInt(formData.studentsBeforeClosure);
    if (students < 0) {
      toast({
        title: "Invalid student count",
        description: "Number of students cannot be negative",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to localStorage (in a real app, this would be sent to a backend)
      const existingData = localStorage.getItem('schoolClosuresData');
      const dataArray = existingData ? JSON.parse(existingData) : [];
      
      const newEntry = {
        id: Date.now().toString(),
        schoolName: formData.schoolName,
        district: formData.district,
        village: formData.village,
        yearOfClosure: year,
        reasonForClosure: formData.reasonForClosure,
        studentsBeforeClosure: students,
        whereStudentsGo: formData.whereStudentsGo,
        communityOpinion: formData.communityOpinion || "Not provided",
        dateAdded: new Date().toISOString().split('T')[0]
      };

      dataArray.push(newEntry);
      localStorage.setItem('schoolClosuresData', JSON.stringify(dataArray));

      toast({
        title: "Data saved successfully",
        description: `School closure record for ${formData.schoolName} has been added`,
      });

      // Reset form
      setFormData({
        schoolName: "",
        district: "",
        village: "",
        yearOfClosure: "",
        reasonForClosure: "",
        studentsBeforeClosure: "",
        whereStudentsGo: "",
        communityOpinion: ""
      });

    } catch (error) {
      toast({
        title: "Error saving data",
        description: "There was an error saving the school closure record",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elevated">
            <CardHeader className="bg-gradient-primary text-white">
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-6 h-6" />
                <span>Add School Closure Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* School Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">School Information</h3>
                  
                  <div>
                    <Label htmlFor="schoolName">School Name *</Label>
                    <Input
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange('schoolName', e.target.value)}
                      placeholder="Enter the full name of the school"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district">District *</Label>
                      <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {maharashtraDistricts.map(district => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="village">Village/Town *</Label>
                      <Input
                        id="village"
                        value={formData.village}
                        onChange={(e) => handleInputChange('village', e.target.value)}
                        placeholder="Enter village or town name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Closure Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">Closure Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="yearOfClosure">Year of Closure *</Label>
                      <Select value={formData.yearOfClosure} onValueChange={(value) => handleInputChange('yearOfClosure', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {[2020, 2021, 2022, 2023, 2024, 2025].map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="studentsBeforeClosure">Students Before Closure *</Label>
                      <Input
                        id="studentsBeforeClosure"
                        type="number"
                        min="0"
                        value={formData.studentsBeforeClosure}
                        onChange={(e) => handleInputChange('studentsBeforeClosure', e.target.value)}
                        placeholder="Number of students"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reasonForClosure">Primary Reason for Closure *</Label>
                    <Select value={formData.reasonForClosure} onValueChange={(value) => handleInputChange('reasonForClosure', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons.map(reason => (
                          <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="whereStudentsGo">Where Students Now Go for Education *</Label>
                    <Input
                      id="whereStudentsGo"
                      value={formData.whereStudentsGo}
                      onChange={(e) => handleInputChange('whereStudentsGo', e.target.value)}
                      placeholder="e.g., Nearby school name, Distance details"
                      required
                    />
                  </div>
                </div>

                {/* Community Feedback */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">Community Feedback</h3>
                  
                  <div>
                    <Label htmlFor="communityOpinion">Local Community Opinion</Label>
                    <Textarea
                      id="communityOpinion"
                      value={formData.communityOpinion}
                      onChange={(e) => handleInputChange('communityOpinion', e.target.value)}
                      placeholder="Optional: Any feedback from local community, parents, or stakeholders about the closure"
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save School Closure Record"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}