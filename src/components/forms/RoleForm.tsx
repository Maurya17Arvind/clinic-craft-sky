import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormProps {
  initialData?: Partial<RoleFormData>;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const availablePermissions = [
  "user_management",
  "patient_records",
  "appointment_scheduling",
  "billing_access",
  "reporting",
  "system_admin",
  "pharmacy_access",
  "lab_results"
];

export function RoleForm({ initialData, onSubmit, onCancel, isLoading }: RoleFormProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    initialData?.permissions || []
  );

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      permissions: initialData?.permissions || [],
    },
  });

  const handleSubmit = (data: RoleFormData) => {
    onSubmit({ ...data, permissions: selectedPermissions });
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the role's responsibilities and access level"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Permissions</FormLabel>
          <div className="space-y-3">
            {availablePermissions.map(permission => (
              <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium capitalize">{permission.replace('_', ' ')}</p>
                  <p className="text-sm text-muted-foreground">
                    Access to {permission.replace('_', ' ').toLowerCase()} functionality
                  </p>
                </div>
                <Button
                  type="button"
                  variant={selectedPermissions.includes(permission) ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePermission(permission)}
                >
                  {selectedPermissions.includes(permission) ? "Remove" : "Add"}
                </Button>
              </div>
            ))}
          </div>
          
          {selectedPermissions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {selectedPermissions.map(permission => (
                  <Badge key={permission} variant="secondary" className="flex items-center gap-1">
                    {permission.replace('_', ' ')}
                    <button
                      type="button"
                      onClick={() => togglePermission(permission)}
                      className="hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
}