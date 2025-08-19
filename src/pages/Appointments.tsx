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
import { Plus, Search, Filter, Edit, Eye, Calendar, Clock, User, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const appointments = [
  {
    id: "A001",
    patient: "John Smith",
    patientId: "P001",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2024-01-20",
    time: "09:00 AM",
    type: "Consultation",
    status: "Scheduled",
    room: "C-301",
    notes: "Regular checkup"
  },
  {
    id: "A002",
    patient: "Emily Davis",
    patientId: "P002",
    doctor: "Dr. Michael Chen",
    department: "Endocrinology",
    date: "2024-01-20",
    time: "10:30 AM",
    type: "Follow-up",
    status: "In Progress",
    room: "E-205",
    notes: "Diabetes follow-up"
  },
  {
    id: "A003",
    patient: "Robert Johnson",
    patientId: "P003",
    doctor: "Dr. Lisa Rodriguez",
    department: "Surgery",
    date: "2024-01-20",
    time: "02:00 PM",
    type: "Pre-Surgery",
    status: "Completed",
    room: "S-401",
    notes: "Pre-operative consultation"
  },
  {
    id: "A004",
    patient: "Maria Garcia",
    patientId: "P004",
    doctor: "Dr. James Thompson",
    department: "Emergency",
    date: "2024-01-21",
    time: "08:00 AM",
    type: "Emergency",
    status: "Urgent",
    room: "ER-1",
    notes: "Emergency consultation"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Scheduled":
      return <Badge className="bg-medical-accent text-white">Scheduled</Badge>;
    case "In Progress":
      return <Badge className="bg-primary text-white">In Progress</Badge>;
    case "Completed":
      return <Badge className="bg-success text-white">Completed</Badge>;
    case "Urgent":
      return <Badge variant="destructive">Urgent</Badge>;
    case "Cancelled":
      return <Badge variant="secondary">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "Emergency":
      return <Badge variant="destructive">{type}</Badge>;
    case "Surgery":
    case "Pre-Surgery":
      return <Badge className="bg-medical-accent text-white">{type}</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("2024-01-20");

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked",
      description: "New appointment has been successfully scheduled.",
    });
  };

  const handleStartAppointment = (appointment: any) => {
    toast({
      title: "Starting Appointment",
      description: `Beginning consultation with ${appointment.patient}`,
    });
  };

  const handleCompleteAppointment = (appointment: any) => {
    toast({
      title: "Appointment Completed",
      description: `Consultation with ${appointment.patient} has been completed.`,
    });
  };

  const handleReschedule = (appointment: any) => {
    toast({
      title: "Rescheduling",
      description: `Rescheduling appointment for ${appointment.patient}`,
    });
  };

  const handleFilterAppointments = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering appointments by selected criteria.",
    });
  };

  const handleViewAppointment = (appointment: any) => {
    toast({
      title: "View Appointment",
      description: `Opening appointment details for ${appointment.patient}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
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
                <Button className="bg-gradient-primary" onClick={handleBookAppointment}>
                  Book Appointment
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
                <p className="text-sm text-muted-foreground">Today's Total</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">45</p>
              </div>
              <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-primary">23</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-medical-accent">21</p>
              </div>
              <div className="w-8 h-8 bg-medical-accent rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
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
                placeholder="Search appointments by patient, doctor, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
            <Button variant="outline" onClick={handleFilterAppointments}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} alt={appointment.patient} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(appointment.type)}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {appointment.room}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {appointment.status === "Scheduled" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStartAppointment(appointment)}
                        >
                          Start
                        </Button>
                      )}
                      {appointment.status === "In Progress" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCompleteAppointment(appointment)}
                        >
                          Complete
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReschedule(appointment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment)}>
                        <Eye className="w-4 h-4" />
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