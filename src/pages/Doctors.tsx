import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Filter, Edit, Eye, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const doctors = [
  {
    id: "D001",
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    department: "Heart Institute",
    experience: "15 years",
    phone: "+1 (555) 111-2222",
    email: "sarah.wilson@medicare.com",
    status: "Available",
    location: "Building A, Floor 3",
    rating: 4.9,
    patients: 45
  },
  {
    id: "D002",
    name: "Dr. Michael Chen",
    specialization: "Endocrinology",
    department: "Internal Medicine",
    experience: "12 years",
    phone: "+1 (555) 222-3333",
    email: "michael.chen@medicare.com",
    status: "In Surgery",
    location: "Building B, Floor 2",
    rating: 4.8,
    patients: 38
  },
  {
    id: "D003",
    name: "Dr. Lisa Rodriguez",
    specialization: "General Surgery",
    department: "Surgical",
    experience: "18 years",
    phone: "+1 (555) 333-4444",
    email: "lisa.rodriguez@medicare.com",
    status: "Available",
    location: "Building A, Floor 5",
    rating: 4.9,
    patients: 52
  },
  {
    id: "D004",
    name: "Dr. James Thompson",
    specialization: "Emergency Medicine",
    department: "Emergency",
    experience: "10 years",
    phone: "+1 (555) 444-5555",
    email: "james.thompson@medicare.com",
    status: "On Call",
    location: "Emergency Wing",
    rating: 4.7,
    patients: 28
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Available":
      return <Badge className="bg-success text-white">Available</Badge>;
    case "In Surgery":
      return <Badge variant="destructive">In Surgery</Badge>;
    case "On Call":
      return <Badge className="bg-medical-accent text-white">On Call</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    toast({
      title: "Doctor Added",
      description: "New doctor has been successfully registered.",
    });
  };

  const handleContactDoctor = (doctor: any) => {
    toast({
      title: "Contacting Doctor",
      description: `Calling ${doctor.name} at ${doctor.phone}`,
    });
  };

  const handleViewProfile = (doctor: any) => {
    toast({
      title: "Doctor Profile",
      description: `Viewing ${doctor.name}'s complete profile`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctors</h1>
          <p className="text-muted-foreground">Manage medical staff and specialists</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
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
                <Button className="bg-gradient-primary" onClick={handleAddDoctor}>
                  Register Doctor
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Doctors</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">89</p>
              </div>
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Surgery</p>
                <p className="text-2xl font-bold text-destructive">12</p>
              </div>
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Call</p>
                <p className="text-2xl font-bold text-medical-accent">15</p>
              </div>
              <div className="w-12 h-12 bg-medical-accent rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search doctors by name, specialization, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Medical Staff ({filteredDoctors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} alt={doctor.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {doctor.name.split(' ').map(n => n[1] || n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doctor.id} • {doctor.experience}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{doctor.specialization}</p>
                      <p className="text-sm text-muted-foreground">{doctor.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {doctor.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" />
                        {doctor.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {doctor.location}
                    </div>
                  </TableCell>
                  <TableCell>{doctor.patients}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProfile(doctor)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactDoctor(doctor)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}