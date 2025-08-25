import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
}

export default function PermissionSettings() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "User Management",
      description: "Create, edit, and delete user accounts",
      category: "Administration",
      enabled: true
    },
    {
      id: "2",
      name: "Patient Records Access",
      description: "View and edit patient medical records",
      category: "Medical",
      enabled: true
    },
    {
      id: "3",
      name: "Appointment Scheduling",
      description: "Create and manage patient appointments",
      category: "Operations",
      enabled: true
    },
    {
      id: "4",
      name: "Billing Access",
      description: "Access billing and payment information",
      category: "Finance",
      enabled: true
    },
    {
      id: "5",
      name: "Reporting Dashboard",
      description: "Access to system reports and analytics",
      category: "Analytics",
      enabled: true
    },
    {
      id: "6",
      name: "System Administration",
      description: "Modify system settings and configurations",
      category: "Administration",
      enabled: false
    },
    {
      id: "7",
      name: "Pharmacy Access",
      description: "Manage medications and prescriptions",
      category: "Medical",
      enabled: true
    },
    {
      id: "8",
      name: "Lab Results",
      description: "View and manage laboratory test results",
      category: "Medical",
      enabled: true
    },
    {
      id: "9",
      name: "Emergency Override",
      description: "Override system restrictions in emergencies",
      category: "Emergency",
      enabled: false
    },
    {
      id: "10",
      name: "Data Export",
      description: "Export patient and system data",
      category: "Administration",
      enabled: false
    }
  ]);

  const togglePermission = (permissionId: string) => {
    setPermissions(permissions.map(permission =>
      permission.id === permissionId
        ? { ...permission, enabled: !permission.enabled }
        : permission
    ));
  };

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: "Permission settings have been saved successfully.",
    });
  };

  const categories = Array.from(new Set(permissions.map(p => p.category)));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Administration: "bg-primary",
      Medical: "bg-success",
      Operations: "bg-medical-accent",
      Finance: "bg-warning",
      Analytics: "bg-info",
      Emergency: "bg-destructive"
    };
    return colors[category] || "bg-secondary";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Permission Settings</h1>
          <p className="text-muted-foreground">Configure system-wide permission settings</p>
        </div>
        <Button onClick={handleSavePermissions} className="bg-gradient-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Permissions
        </Button>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <Card key={category} className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <Badge className={`${getCategoryColor(category)} text-white mr-3`}>
                  {category}
                </Badge>
                {category} Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {permissions
                .filter(permission => permission.category === category)
                .map(permission => (
                  <div key={permission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium">{permission.name}</h3>
                        <Badge 
                          variant={permission.enabled ? "default" : "secondary"}
                          className={permission.enabled ? "bg-success text-white" : ""}
                        >
                          {permission.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                    <Switch
                      checked={permission.enabled}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card border-warning">
        <CardHeader>
          <CardTitle className="flex items-center text-warning">
            <Shield className="w-5 h-5 mr-2" />
            Security Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Changes to permission settings will affect all users with the corresponding roles. 
            Critical permissions like "System Administration" and "Emergency Override" should be 
            enabled only for trusted users. All permission changes are logged for security auditing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}