import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, BarChart3, FileText, Users, Building, MapPin, TrendingDown } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Maharashtra School Closures
            <br />
            <span className="text-accent/90">Research Platform</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            A comprehensive data collection and analysis platform to track government school closures 
            across Maharashtra (2020-2025) and their impact on rural education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white">
              <Link to="/add-data">
                <Plus className="w-5 h-5 mr-2" />
                Add School Data
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/dashboard">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Research Objectives</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the scope and impact of school closures to inform policy decisions and community support initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader>
                <Building className="w-10 h-10 text-primary mb-2" />
                <CardTitle>School Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive records of school names, locations, and closure details across all Maharashtra districts.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader>
                <TrendingDown className="w-10 h-10 text-destructive mb-2" />
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track reasons for closure, affected student populations, and understand patterns across regions.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader>
                <Users className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Community Voices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Collect local community opinions and understand the real-world impact on families and villages.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader>
                <MapPin className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Geographic Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  District and village-level data to identify geographic patterns and affected regions.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader>
                <FileText className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Data Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Export collected data in CSV or JSON formats for further analysis and research purposes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time visualization of data trends, statistics, and insights from collected information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Categories */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Data Collection Framework</h2>
            <p className="text-lg text-muted-foreground">
              Each school closure record includes comprehensive information across these key categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">School Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">School Name</Badge>
                  <span className="text-sm text-muted-foreground">Full official name</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">District</Badge>
                  <span className="text-sm text-muted-foreground">Maharashtra district</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Village/Town</Badge>
                  <span className="text-sm text-muted-foreground">Local area details</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Closure Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Year of Closure</Badge>
                  <span className="text-sm text-muted-foreground">2020-2025 timeline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Closure Reason</Badge>
                  <span className="text-sm text-muted-foreground">Primary cause identified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Student Count</Badge>
                  <span className="text-sm text-muted-foreground">Enrollment before closure</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Impact Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Student Relocation</Badge>
                  <span className="text-sm text-muted-foreground">Where students now study</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Distance Impact</Badge>
                  <span className="text-sm text-muted-foreground">Travel requirements</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Community Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Local Opinion</Badge>
                  <span className="text-sm text-muted-foreground">Community perspectives</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Parent Concerns</Badge>
                  <span className="text-sm text-muted-foreground">Family impact stories</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <Card className="max-w-4xl mx-auto shadow-elevated">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Contribute to the Research</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Help build a comprehensive database of school closures in Maharashtra. Your contribution 
                will support policy research and community advocacy efforts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90">
                  <Link to="/add-data">
                    <Plus className="w-5 h-5 mr-2" />
                    Start Adding Data
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Explore Existing Data
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}