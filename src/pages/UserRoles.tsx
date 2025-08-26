import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RoleForm } from "@/components/forms/RoleForm";
import { Users, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
}

export default function UserRoles() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Administrator",
      description: "Full system access including user management, settings, and data administration.",
      permissions: ["user_management", "system_admin", "reporting", "billing_access"],
      userCount: 5,
      color: "bg-primary"
    },
    {
      id: "2",
      name: "Doctor",
      description: "Access to patient records, medical procedures, and prescription management.",
      permissions: ["patient_records", "appointment_scheduling", "pharmacy_access", "lab_results"],
      userCount: 156,
      color: "bg-success"
    },
    {
      id: "3",
      name: "Nurse",
      description: "Patient care access, basic medical records, and nursing documentation.",
      permissions: ["patient_records", "appointment_scheduling"],
      userCount: 89,
      color: "bg-medical-accent"
    },
    {
      id: "4",
      name: "Receptionist",
      description: "Front desk operations, appointment scheduling, and basic patient information.",
      permissions: ["appointment_scheduling"],
      userCount: 23,
      color: "bg-secondary"
    }
  ]);

  const handleCreateRole = (data: any) => {
    console.log("Creating role:", data);
    const newRole: Role = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      permissions: data.permissions,
      userCount: 0,
      color: "bg-muted"
    };
    setRoles([...roles, newRole]);
    setIsDialogOpen(false);
    toast({
      title: "Role Created",
      description: `${data.name} role has been created successfully.`,
    });
  };

  const handleEditRole = (data: any) => {
    console.log("Editing role:", data);
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, name: data.name, description: data.description, permissions: data.permissions }
          : role
      ));
      setEditingRole(null);
      setIsDialogOpen(false);
      toast({
        title: "Role Updated",
        description: `${data.name} role has been updated successfully.`,
      });
    }
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "Role has been deleted successfully.",
    });
  };

  const openCreateDialog = () => {
    setEditingRole(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Role Management</h1>
          <p className="text-muted-foreground">Define and manage user roles and permissions</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-gradient-primary">
          Add New Role
        </Button>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <Card key={role.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Badge className={`${role.color} text-white`}>{role.name}</Badge>
                  <span className="font-medium text-lg">{role.name}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(role)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{role.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{role.userCount} users assigned</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map(permission => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? "Edit Role" : "Create New Role"}
            </DialogTitle>
          </DialogHeader>
          <RoleForm
            initialData={editingRole || undefined}
            onSubmit={editingRole ? handleEditRole : handleCreateRole}
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}