import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, Search, Filter, Download, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  status: "success" | "failed" | "warning";
  details: string;
}

export default function UserActivity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [activities] = useState<ActivityLog[]>([
    {
      id: "1",
      userId: "user_1",
      userName: "Dr. Sarah Johnson",
      userRole: "Doctor",
      action: "Viewed Patient Record",
      resource: "Patient #12345",
      timestamp: new Date(2024, 0, 15, 10, 30),
      ipAddress: "192.168.1.100",
      status: "success",
      details: "Accessed patient medical history"
    },
    {
      id: "2",
      userId: "user_2",
      userName: "John Admin",
      userRole: "Administrator",
      action: "Created User Account",
      resource: "Dr. Michael Chen",
      timestamp: new Date(2024, 0, 15, 9, 15),
      ipAddress: "192.168.1.50",
      status: "success",
      details: "Created new doctor account"
    },
    {
      id: "3",
      userId: "user_3",
      userName: "Nurse Mary",
      userRole: "Nurse",
      action: "Failed Login Attempt",
      resource: "Login System",
      timestamp: new Date(2024, 0, 15, 8, 45),
      ipAddress: "192.168.1.75",
      status: "failed",
      details: "Invalid password entered"
    },
    {
      id: "4",
      userId: "user_4",
      userName: "Dr. Robert Wilson",
      userRole: "Doctor",
      action: "Updated Prescription",
      resource: "Patient #67890",
      timestamp: new Date(2024, 0, 15, 8, 20),
      ipAddress: "192.168.1.120",
      status: "success",
      details: "Modified medication dosage"
    },
    {
      id: "5",
      userId: "user_5",
      userName: "Lisa Receptionist",
      userRole: "Receptionist",
      action: "Scheduled Appointment",
      resource: "Dr. Johnson - Patient #11111",
      timestamp: new Date(2024, 0, 15, 7, 30),
      ipAddress: "192.168.1.25",
      status: "success",
      details: "Booked follow-up appointment"
    },
    {
      id: "6",
      userId: "user_6",
      userName: "Dr. Emily Davis",
      userRole: "Doctor",
      action: "Accessed Lab Results",
      resource: "Lab Report #LR-2024-001",
      timestamp: new Date(2024, 0, 14, 16, 45),
      ipAddress: "192.168.1.110",
      status: "warning",
      details: "Accessed results outside normal hours"
    }
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || activity.userRole.toLowerCase() === filterRole;
    const matchesStatus = filterStatus === "all" || activity.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-success text-white";
      case "failed": return "bg-destructive text-white";
      case "warning": return "bg-warning text-white";
      default: return "bg-secondary text-white";
    }
  };

  const getActionIcon = (action: string) => {
    return <Activity className="w-4 h-4" />;
  };

  const handleExportLogs = () => {
    console.log("Exporting activity logs:", filteredActivities);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Activity Logs</h1>
          <p className="text-muted-foreground">Monitor and audit user actions across the system</p>
        </div>
        <Button onClick={handleExportLogs} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users, actions, or resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar>
                    <AvatarImage src={`/api/placeholder/40/40`} alt={activity.userName} />
                    <AvatarFallback>{activity.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{activity.userName}</h3>
                      <Badge variant="outline">{activity.userRole}</Badge>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      {getActionIcon(activity.action)}
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-muted-foreground">on</span>
                      <span className="font-medium">{activity.resource}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(activity.timestamp, "MMM dd, yyyy 'at' HH:mm")}</span>
                      </div>
                      <span>IP: {activity.ipAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-8">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No activities found</h3>
            <p className="text-muted-foreground">
              No activities match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}