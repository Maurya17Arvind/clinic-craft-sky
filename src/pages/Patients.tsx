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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const patients = [
  {
    id: "P001",
    name: "John Smith",
    age: 34,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    lastVisit: "2024-01-15",
    status: "Active",
    condition: "Hypertension",
    doctor: "Dr. Sarah Wilson"
  },
  {
    id: "P002",
    name: "Emily Davis",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 234-5678",
    email: "emily.davis@email.com",
    lastVisit: "2024-01-14",
    status: "Active",
    condition: "Diabetes",
    doctor: "Dr. Michael Chen"
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 345-6789",
    email: "robert.johnson@email.com",
    lastVisit: "2024-01-12",
    status: "Discharged",
    condition: "Surgery Recovery",
    doctor: "Dr. Lisa Rodriguez"
  },
  {
    id: "P004",
    name: "Maria Garcia",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 456-7890",
    email: "maria.garcia@email.com",
    lastVisit: "2024-01-18",
    status: "Critical",
    condition: "Emergency",
    doctor: "Dr. James Thompson"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-success text-white">Active</Badge>;
    case "Critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "Discharged":
      return <Badge variant="secondary">Discharged</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  const handleAddPatient = () => {
    toast({
      title: "Patient Registered",
      description: "New patient has been successfully registered.",
    });
  };

  const handleFilterPatients = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering patients by selected criteria.",
    });
  };

  const handleViewPatient = (patient: any) => {
    toast({
      title: "View Patient",
      description: `Opening detailed profile for ${patient.name}`,
    });
  };

  const handleEditPatient = (patient: any) => {
    toast({
      title: "Edit Patient",
      description: `Editing profile for ${patient.name}`,
    });
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    const matchesGender = !genderFilter || patient.gender === genderFilter;
    const matchesDoctor = !doctorFilter || patient.doctor.toLowerCase().includes(doctorFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesGender && matchesDoctor;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground">Manage patient records and information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
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
      </div>

      {/* Enhanced Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients by name, ID, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter by doctor..."
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Patient Records ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} alt={patient.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.id} • {patient.age}y • {patient.gender}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{patient.phone}</p>
                      <p className="text-sm text-muted-foreground">{patient.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Patient Details - {patient.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Patient ID</label>
                                <p className="text-sm">{patient.id}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <p className="text-sm">{patient.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Age</label>
                                <p className="text-sm">{patient.age} years</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                                <p className="text-sm">{patient.gender}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                <p className="text-sm">{patient.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-sm">{patient.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Last Visit</label>
                                <p className="text-sm">{patient.lastVisit}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <p className="text-sm">{patient.status}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Condition</label>
                                <p className="text-sm">{patient.condition}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Assigned Doctor</label>
                                <p className="text-sm">{patient.doctor}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Patient - {patient.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">First Name</label>
                              <Input defaultValue={patient.name.split(' ')[0]} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Last Name</label>
                              <Input defaultValue={patient.name.split(' ')[1]} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Age</label>
                              <Input type="number" defaultValue={patient.age} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Gender</label>
                              <Input defaultValue={patient.gender} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Phone</label>
                              <Input defaultValue={patient.phone} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Email</label>
                              <Input type="email" defaultValue={patient.email} />
                            </div>
                            <div className="col-span-2 space-y-2">
                              <label className="text-sm font-medium">Medical Condition</label>
                              <Input defaultValue={patient.condition} />
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-gradient-primary" onClick={() => handleEditPatient(patient)}>Update Patient</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
