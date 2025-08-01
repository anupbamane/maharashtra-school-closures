import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchoolClosure {
  id: string;
  schoolName: string;
  district: string;
  village: string;
  yearOfClosure: number;
  reasonForClosure: string;
  studentsBeforeClosure: number;
  whereStudentsGo: string;
  communityOpinion: string;
  dateAdded: string;
}

export default function Dashboard() {
  const [data, setData] = useState<SchoolClosure[]>([]);
  const [filteredData, setFilteredData] = useState<SchoolClosure[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('schoolClosuresData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      setFilteredData(parsedData);
    }
  }, []);

  useEffect(() => {
    let filtered = data.filter(item => {
      const matchesSearch = item.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.village.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = yearFilter === "all" || item.yearOfClosure.toString() === yearFilter;
      const matchesDistrict = districtFilter === "all" || item.district === districtFilter;
      
      return matchesSearch && matchesYear && matchesDistrict;
    });
    
    setFilteredData(filtered);
  }, [data, searchTerm, yearFilter, districtFilter]);

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      toast({
        title: "No data to export",
        description: "Please add some data first or adjust your filters.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "School Name", "District", "Village", "Year of Closure", 
      "Reason for Closure", "Students Before Closure", 
      "Where Students Go", "Community Opinion", "Date Added"
    ];
    
    const csvContent = [
      headers.join(","),
      ...filteredData.map(row => [
        `"${row.schoolName}"`,
        `"${row.district}"`,
        `"${row.village}"`,
        row.yearOfClosure,
        `"${row.reasonForClosure}"`,
        row.studentsBeforeClosure,
        `"${row.whereStudentsGo}"`,
        `"${row.communityOpinion}"`,
        `"${row.dateAdded}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `maharashtra-school-closures-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Exported ${filteredData.length} records to CSV`,
    });
  };

  const exportToJSON = () => {
    if (filteredData.length === 0) {
      toast({
        title: "No data to export",
        description: "Please add some data first or adjust your filters.",
        variant: "destructive",
      });
      return;
    }

    const jsonContent = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `maharashtra-school-closures-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Exported ${filteredData.length} records to JSON`,
    });
  };

  const uniqueDistricts = [...new Set(data.map(item => item.district))].sort();
  const uniqueYears = [...new Set(data.map(item => item.yearOfClosure))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Data Dashboard</h1>
            <div className="flex space-x-2">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={exportToJSON} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{data.length}</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Districts Affected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{uniqueDistricts.length}</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Students Affected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {data.reduce((sum, item) => sum + item.studentsBeforeClosure, 0)}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{filteredData.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters & Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search schools, districts, villages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {uniqueYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={districtFilter} onValueChange={setDistrictFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {uniqueDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>School Closure Records</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {data.length === 0 ? "No data available. Start by adding some school closure records." : "No records match your current filters."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">School Name</th>
                        <th className="text-left p-2 font-semibold">Location</th>
                        <th className="text-left p-2 font-semibold">Year</th>
                        <th className="text-left p-2 font-semibold">Reason</th>
                        <th className="text-left p-2 font-semibold">Students</th>
                        <th className="text-left p-2 font-semibold">Relocated To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((school) => (
                        <tr key={school.id} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{school.schoolName}</td>
                          <td className="p-2">
                            <div className="text-sm">
                              <div>{school.village}</div>
                              <div className="text-muted-foreground">{school.district}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge variant="outline">{school.yearOfClosure}</Badge>
                          </td>
                          <td className="p-2 text-sm max-w-xs truncate" title={school.reasonForClosure}>
                            {school.reasonForClosure}
                          </td>
                          <td className="p-2">
                            <Badge variant="secondary">{school.studentsBeforeClosure}</Badge>
                          </td>
                          <td className="p-2 text-sm max-w-xs truncate" title={school.whereStudentsGo}>
                            {school.whereStudentsGo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}