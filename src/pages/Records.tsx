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
import { Plus, Search, Filter, Edit, Eye, FileText, Download, Upload, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const medicalRecords = [
  {
    id: "MR001",
    patient: "John Smith",
    patientId: "P001",
    recordType: "Lab Report",
    date: "2024-01-18",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    diagnosis: "Hypertension",
    status: "Final",
    priority: "Normal",
    fileSize: "2.4 MB"
  },
  {
    id: "MR002",
    patient: "Emily Davis",
    patientId: "P002",
    recordType: "X-Ray",
    date: "2024-01-17",
    doctor: "Dr. Michael Chen",
    department: "Radiology",
    diagnosis: "Chest X-Ray Normal",
    status: "Reviewed",
    priority: "Normal",
    fileSize: "8.1 MB"
  },
  {
    id: "MR003",
    patient: "Robert Johnson",
    patientId: "P003",
    recordType: "Surgery Report",
    date: "2024-01-15",
    doctor: "Dr. Lisa Rodriguez",
    department: "Surgery",
    diagnosis: "Appendectomy",
    status: "Final",
    priority: "High",
    fileSize: "1.8 MB"
  },
  {
    id: "MR004",
    patient: "Maria Garcia",
    patientId: "P004",
    recordType: "Emergency Report",
    date: "2024-01-19",
    doctor: "Dr. James Thompson",
    department: "Emergency",
    diagnosis: "Acute Care",
    status: "Pending",
    priority: "Urgent",
    fileSize: "3.2 MB"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Final":
      return <Badge className="bg-success text-white">Final</Badge>;
    case "Reviewed":
      return <Badge className="bg-primary text-white">Reviewed</Badge>;
    case "Pending":
      return <Badge className="bg-medical-accent text-white">Pending</Badge>;
    case "Draft":
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return <Badge variant="destructive">Urgent</Badge>;
    case "High":
      return <Badge className="bg-orange-500 text-white">High</Badge>;
    case "Normal":
      return <Badge variant="outline">Normal</Badge>;
    case "Low":
      return <Badge variant="secondary">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

export default function Records() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = medicalRecords.filter(record =>
    record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recordType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecord = () => {
    toast({
      title: "Record Added",
      description: "New medical record has been successfully created.",
    });
  };

  const handleDownload = (record: any) => {
    toast({
      title: "Downloading Record",
      description: `Downloading ${record.recordType} for ${record.patient}`,
    });
  };

  const handleViewRecord = (record: any) => {
    toast({
      title: "Opening Record",
      description: `Viewing ${record.recordType} for ${record.patient}`,
    });
  };

  const handleUploadFile = () => {
    toast({
      title: "File Upload",
      description: "File upload dialog opened",
    });
  };

  const handleFilterRecords = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering records by selected criteria.",
    });
  };

  const handleEditRecord = (record: any) => {
    toast({
      title: "Edit Record",
      description: `Editing ${record.recordType} for ${record.patient}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">Manage patient medical records and documents</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleUploadFile}>
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Medical Record</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient</label>
                  <Input placeholder="Search patient..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Record Type</label>
                  <Input placeholder="Lab Report, X-Ray, etc." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Doctor</label>
                  <Input placeholder="Select doctor..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Input placeholder="Cardiology, Radiology, etc." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Input placeholder="Normal, High, Urgent" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Diagnosis</label>
                  <Input placeholder="Enter diagnosis..." />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Input placeholder="Additional notes..." />
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-gradient-primary" onClick={handleAddRecord}>
                    Create Record
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-medical-accent">23</p>
              </div>
              <div className="w-8 h-8 bg-medical-accent rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Records</p>
                <p className="text-2xl font-bold">67</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">2.8 GB</p>
              </div>
              <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
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
                placeholder="Search records by patient, type, diagnosis, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleFilterRecords}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
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
                <TableHead>Record Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} alt={record.patient} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {record.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.patient}</p>
                        <p className="text-sm text-muted-foreground">{record.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.recordType}</p>
                      <p className="text-sm text-muted-foreground">{record.fileSize}</p>
                    </div>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.doctor}</p>
                      <p className="text-sm text-muted-foreground">{record.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{getPriorityBadge(record.priority)}</TableCell>
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
                            <DialogTitle>Medical Record - {record.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Record ID</label>
                                <p className="text-sm">{record.id}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Patient</label>
                                <p className="text-sm">{record.patient} ({record.patientId})</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Record Type</label>
                                <p className="text-sm">{record.recordType}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Date</label>
                                <p className="text-sm">{record.date}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                                <p className="text-sm">{record.doctor}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Department</label>
                                <p className="text-sm">{record.department}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">File Size</label>
                                <p className="text-sm">{record.fileSize}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Priority</label>
                                <p className="text-sm">{record.priority}</p>
                              </div>
                              <div className="col-span-2">
                                <label className="text-sm font-medium text-muted-foreground">Diagnosis</label>
                                <p className="text-sm">{record.diagnosis}</p>
                              </div>
                              <div className="col-span-2">
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <p className="text-sm">{record.status}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(record)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Medical Record - {record.id}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Record Type</label>
                              <Input defaultValue={record.recordType} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Date</label>
                              <Input type="date" defaultValue={record.date} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Doctor</label>
                              <Input defaultValue={record.doctor} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Department</label>
                              <Input defaultValue={record.department} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Priority</label>
                              <Input defaultValue={record.priority} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Status</label>
                              <Input defaultValue={record.status} />
                            </div>
                            <div className="col-span-2 space-y-2">
                              <label className="text-sm font-medium">Diagnosis</label>
                              <Input defaultValue={record.diagnosis} />
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-gradient-primary" onClick={() => handleEditRecord(record)}>Update Record</Button>
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