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
  DialogDescription,
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
import { Plus, Search, Filter, Edit, Eye, FileText, Calendar, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const records = [
  {
    id: "R001",
    patientId: "P001",
    patientName: "John Smith",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2024-01-20",
    type: "Consultation",
    diagnosis: "Hypertension",
    notes: "Regular checkup",
    status: "Completed"
  },
  {
    id: "R002",
    patientId: "P002",
    patientName: "Emily Davis",
    doctor: "Dr. Michael Chen",
    department: "Endocrinology",
    date: "2024-01-20",
    type: "Lab Results",
    diagnosis: "Diabetes",
    notes: "Blood sugar levels checked",
    status: "Completed"
  },
  {
    id: "R003",
    patientId: "P003",
    patientName: "Robert Johnson",
    doctor: "Dr. Lisa Rodriguez",
    department: "Surgery",
    date: "2024-01-21",
    type: "Surgery",
    diagnosis: "Appendectomy",
    notes: "Successful surgery",
    status: "Completed"
  },
  {
    id: "R004",
    patientId: "P004",
    patientName: "Maria Garcia",
    doctor: "Dr. James Thompson",
    department: "Emergency",
    date: "2024-01-21",
    type: "Emergency",
    diagnosis: "Fractured Arm",
    notes: "Immediate care provided",
    status: "Completed"
  }
];

const getTypeBadge = (type: string) => {
  switch (type) {
    case "Consultation":
      return <Badge variant="outline">{type}</Badge>;
    case "Surgery":
      return <Badge className="bg-medical-accent text-white">{type}</Badge>;
    case "Lab Results":
      return <Badge className="bg-primary text-white">{type}</Badge>;
    case "Emergency":
      return <Badge variant="destructive">{type}</Badge>;
    case "Follow-up":
      return <Badge variant="secondary">{type}</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

export default function Records() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleViewRecord = (record: any) => {
    toast({
      title: "View Record",
      description: `Opening medical record for ${record.patientName}`,
    });
  };

  const handleEditRecord = (record: any) => {
    toast({
      title: "Edit Record",
      description: `Editing medical record for ${record.patientName}`,
    });
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !typeFilter || typeFilter === "all" || record.type === typeFilter;
    const matchesDoctor = !doctorFilter || record.doctor.toLowerCase().includes(doctorFilter.toLowerCase());
    const matchesDate = !dateFilter || record.date === dateFilter;
    
    return matchesSearch && matchesType && matchesDoctor && matchesDate;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">Manage and view patient medical records</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Record
        </Button>
      </div>

      {/* Enhanced Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search records by patient, ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Record Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="Lab Results">Lab Results</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter by doctor..."
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
            />
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} alt={record.patientName} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {record.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.patientName}</p>
                        <p className="text-sm text-muted-foreground">{record.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.doctor}</p>
                      <p className="text-sm text-muted-foreground">{record.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {record.date}
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(record.type)}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
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
                            <DialogTitle>Medical Record Details</DialogTitle>
                            <DialogDescription>
                              Complete medical record information for {record.patientName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Record ID</label>
                                <p className="font-medium">{record.id}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Patient ID</label>
                                <p className="font-medium">{record.patientId}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Patient Name</label>
                                <p className="font-medium">{record.patientName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                                <p className="font-medium">{record.doctor}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Department</label>
                                <p className="font-medium">{record.department}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Date</label>
                                <p className="font-medium">{record.date}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Type</label>
                                <div>{getTypeBadge(record.type)}</div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <Badge variant="secondary">{record.status}</Badge>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Diagnosis</label>
                              <p className="font-medium">{record.diagnosis}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Notes</label>
                              <p className="text-sm text-muted-foreground">{record.notes}</p>
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
                            <DialogTitle>Edit Medical Record</DialogTitle>
                            <DialogDescription>
                              Update medical record information for {record.patientName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Record ID</label>
                                <Input value={record.id} disabled />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Patient ID</label>
                                <Input value={record.patientId} disabled />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Patient Name</label>
                                <Input value={record.patientName} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Doctor</label>
                                <Input value={record.doctor} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Department</label>
                                <Input value={record.department} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Date</label>
                                <Input type="date" value={record.date} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Type</label>
                                <Select defaultValue={record.type}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Consultation">Consultation</SelectItem>
                                    <SelectItem value="Surgery">Surgery</SelectItem>
                                    <SelectItem value="Lab Results">Lab Results</SelectItem>
                                    <SelectItem value="Emergency">Emergency</SelectItem>
                                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <Select defaultValue={record.status}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Diagnosis</label>
                              <Input value={record.diagnosis} />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Notes</label>
                              <Input value={record.notes} />
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                              <Button variant="outline">Cancel</Button>
                              <Button>Save Changes</Button>
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
