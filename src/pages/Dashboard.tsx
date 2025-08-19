import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
      title: "Patient Registered",
      description: "New patient has been successfully registered.",
    });
  };

  const handleScheduleAppointment = () => {
    toast({
      title: "Appointment Scheduled",
      description: "New appointment has been successfully booked.",
    });
  };

  const handleAddDoctor = () => {
    toast({
      title: "Doctor Added",
      description: "New doctor has been successfully registered.",
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Register New Patient</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input type="number" placeholder="Enter age" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    <Input placeholder="Male/Female/Other" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Medical Condition</label>
                    <Input placeholder="Enter primary condition" />
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-primary" onClick={handleAddPatient}>Register Patient</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient</label>
                    <Input placeholder="Search patient..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Doctor</label>
                    <Input placeholder="Select doctor..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input placeholder="Cardiology, Neurology, etc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Input placeholder="Consultation, Follow-up, etc." />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Input placeholder="Additional notes..." />
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-primary" onClick={handleScheduleAppointment}>Book Appointment</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start bg-gradient-primary hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Register New Patient
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Register New Patient</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Enter last name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age</label>
                      <Input type="number" placeholder="Enter age" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <Input placeholder="Male/Female/Other" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="Enter email" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-sm font-medium">Medical Condition</label>
                      <Input placeholder="Enter primary condition" />
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-gradient-primary" onClick={handleAddPatient}>Register Patient</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Patient</label>
                      <Input placeholder="Search patient..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Doctor</label>
                      <Input placeholder="Select doctor..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input placeholder="Cardiology, Neurology, etc." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Input placeholder="Consultation, Follow-up, etc." />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <Input placeholder="Additional notes..." />
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-gradient-primary" onClick={handleScheduleAppointment}>Book Appointment</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Add Doctor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Register New Doctor</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="Dr. John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Specialization</label>
                      <Input placeholder="Cardiology, Neurology, etc." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input placeholder="Internal Medicine" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience</label>
                      <Input placeholder="10 years" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="doctor@medicare.com" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="Building A, Floor 3" />
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-gradient-primary" onClick={handleAddDoctor}>Register Doctor</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="w-full justify-start">
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