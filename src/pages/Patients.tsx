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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleFilterPatients}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
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
                      <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
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