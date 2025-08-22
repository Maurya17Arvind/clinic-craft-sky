import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Database,
  Users,
  Activity,
  Save,
  Upload,
  Download,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    alerts: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    maintenanceMode: false,
    dataRetention: "5",
    sessionTimeout: "30"
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Updated",
      description: "System configuration has been updated successfully.",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup Started",
      description: "Database backup is in progress. You'll be notified when complete.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Preparing data export. Download will start shortly.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBackupNow}>
            <Download className="w-4 h-4 mr-2" />
            Backup Now
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Upload className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Hospital Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/api/placeholder/80/80" alt="Hospital Logo" />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">MC</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Logo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: 512x512px, PNG or JPG
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hospital Name</label>
                  <Input defaultValue="MediCare Hospital" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">License Number</label>
                  <Input defaultValue="HSP-2024-001" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input defaultValue="123 Healthcare Ave, Medical City" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue="info@medicare.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input defaultValue="www.medicare.com" />
                </div>
              </div>

              <Button className="bg-gradient-primary" onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical system and emergency alerts</p>
                  </div>
                  <Switch 
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})}
                  />
                </div>
              </div>

              <Button className="bg-gradient-primary" onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2FA Status</p>
                    <p className="text-sm text-muted-foreground">
                      Additional security for your account
                    </p>
                  </div>
                  <Badge className="bg-success text-white">Enabled</Badge>
                </div>
              </div>

              <Button className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Update Security
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Administrators</h3>
                  <p className="text-2xl font-bold text-primary">5</p>
                  <p className="text-sm text-muted-foreground">Full system access</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Doctors</h3>
                  <p className="text-2xl font-bold text-success">156</p>
                  <p className="text-sm text-muted-foreground">Medical staff access</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Nurses</h3>
                  <p className="text-2xl font-bold text-medical-accent">89</p>
                  <p className="text-sm text-muted-foreground">Nursing staff access</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "User Roles",
                      description: "Opening user role management interface.",
                    });
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage User Roles
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Permissions",
                      description: "Opening permission settings panel.",
                    });
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Permission Settings
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Activity Logs",
                      description: "Loading user activity logs.",
                    });
                  }}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  User Activity Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Roles */}
        <TabsContent value="roles" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Role Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Current User Roles</h3>
                <Button className="bg-gradient-primary">
                  Add New Role
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-primary text-white">Administrator</Badge>
                      <span className="font-medium">System Administrator</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Full system access including user management, settings, and data administration.</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Users: </span>
                    <span className="text-sm">5 assigned</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-success text-white">Doctor</Badge>
                      <span className="font-medium">Medical Doctor</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Access to patient records, medical procedures, and prescription management.</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Users: </span>
                    <span className="text-sm">156 assigned</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-medical-accent text-white">Nurse</Badge>
                      <span className="font-medium">Registered Nurse</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Patient care access, basic medical records, and nursing documentation.</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Users: </span>
                    <span className="text-sm">89 assigned</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-secondary text-white">Receptionist</Badge>
                      <span className="font-medium">Front Desk Staff</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Appointment scheduling, patient registration, and basic information access.</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Users: </span>
                    <span className="text-sm">25 assigned</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Permission Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Module Permissions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Patient Management</p>
                        <p className="text-sm text-muted-foreground">View, create, edit patient records</p>
                      </div>
                      <div className="flex space-x-2">
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Appointment Scheduling</p>
                        <p className="text-sm text-muted-foreground">Manage patient appointments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Medical Records</p>
                        <p className="text-sm text-muted-foreground">Access to medical history and documents</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Prescription Management</p>
                        <p className="text-sm text-muted-foreground">Create and manage prescriptions</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Billing & Finance</p>
                        <p className="text-sm text-muted-foreground">Access financial data and billing</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Administrative Permissions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">User Management</p>
                        <p className="text-sm text-muted-foreground">Create, edit, and delete users</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Settings</p>
                        <p className="text-sm text-muted-foreground">Modify system configuration</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reports & Analytics</p>
                        <p className="text-sm text-muted-foreground">Generate system reports</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Export</p>
                        <p className="text-sm text-muted-foreground">Export system data</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Audit Logs</p>
                        <p className="text-sm text-muted-foreground">View system audit trails</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Permissions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                User Activity Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Search activities..." className="flex-1" />
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson logged in</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.100 • User Agent: Chrome 120.0</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 minutes ago</div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Patient record updated by Nurse Mary</p>
                      <p className="text-sm text-muted-foreground">Patient ID: PAT-2024-001 • Module: Medical Records</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">15 minutes ago</div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-medical-accent rounded-full"></div>
                    <div>
                      <p className="font-medium">New appointment scheduled</p>
                      <p className="text-sm text-muted-foreground">Scheduled by Front Desk • Patient: John Smith</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 hour ago</div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div>
                      <p className="font-medium">Failed login attempt</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.50 • Attempted user: admin</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div>
                      <p className="font-medium">System backup completed</p>
                      <p className="text-sm text-muted-foreground">Size: 2.8 GB • Duration: 45 minutes</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">3 hours ago</div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Prescription created by Dr. Michael Brown</p>
                      <p className="text-sm text-muted-foreground">Patient: Jane Doe • Medication: Amoxicillin</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">4 hours ago</div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Activities</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Backups</p>
                    <p className="text-sm text-muted-foreground">Daily automated system backups</p>
                  </div>
                  <Switch 
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      Restricts system access
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Retention (years)</label>
                    <Input 
                      value={systemSettings.dataRetention}
                      onChange={(e) => setSystemSettings({...systemSettings, dataRetention: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Session Timeout (minutes)</label>
                    <Input 
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">System Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span>Database Status</span>
                    <Badge className="bg-success text-white">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Status</span>
                    <Badge className="bg-success text-white">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Backup</span>
                    <span className="text-sm">2024-01-19 03:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Storage Used</span>
                    <span className="text-sm">2.8 GB / 10 GB</span>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-primary" onClick={handleSaveSystem}>
                <Save className="w-4 h-4 mr-2" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}