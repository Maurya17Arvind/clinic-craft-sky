import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  Calendar,
  Activity,
  Plus,
  TrendingUp,
  Clock,
  Heart
} from "lucide-react";
import hospitalHero from "@/assets/hospital-hero.jpg";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const handleAddPatient = () => {
    toast({
      title: "Add Patient",
      description: "Opening patient registration form...",
    });
  };

  const handleScheduleAppointment = () => {
    toast({
      title: "Schedule Appointment",
      description: "Opening appointment booking form...",
    });
  };

  const handleAddDoctor = () => {
    toast({
      title: "Add Doctor",
      description: "Opening doctor registration form...",
    });
  };

  const handleViewReports = () => {
    toast({
      title: "View Reports",
      description: "Opening analytics dashboard...",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src={hospitalHero}
            alt="Hospital"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to MediCare Hospital</h1>
          <p className="text-lg text-white/90 mb-6">
            Comprehensive healthcare management at your fingertips
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90" onClick={handleAddPatient}>
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleScheduleAppointment}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value="2,847"
          change="+12% from last month"
          icon={<Users className="w-6 h-6" />}
          trend="up"
        />
        <StatsCard
          title="Active Doctors"
          value="156"
          change="+3 new this week"
          icon={<UserCheck className="w-6 h-6" />}
          trend="up"
        />
        <StatsCard
          title="Today's Appointments"
          value="89"
          change="23 completed"
          icon={<Calendar className="w-6 h-6" />}
          trend="neutral"
        />
        <StatsCard
          title="Emergency Cases"
          value="7"
          change="-2 from yesterday"
          icon={<Activity className="w-6 h-6" />}
          trend="down"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-primary hover:opacity-90" onClick={handleAddPatient}>
                <Plus className="w-4 h-4 mr-2" />
                Register New Patient
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleScheduleAppointment}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleAddDoctor}>
                <UserCheck className="w-4 h-4 mr-2" />
                Add Doctor
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleViewReports}>
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Heart className="w-5 h-5 mr-2 text-medical-accent" />
                Hospital Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bed Occupancy</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Staff On Duty</span>
                <span className="text-sm font-medium">124/140</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-accent h-2 rounded-full" style={{ width: "89%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Equipment Status</span>
                <span className="text-sm font-medium text-success">All Systems</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}