import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Filter, Edit, Eye, Pill, AlertTriangle, Package, ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const medications = [
  {
    id: "M001",
    name: "Lisinopril 10mg",
    category: "Cardiovascular",
    manufacturer: "Pfizer Inc.",
    stock: 450,
    minStock: 100,
    price: 25.99,
    expiryDate: "2025-08-15",
    batchNo: "LP2024-001",
    status: "In Stock"
  },
  {
    id: "M002",
    name: "Metformin 500mg",
    category: "Diabetes",
    manufacturer: "Teva Pharmaceuticals",
    stock: 32,
    minStock: 50,
    price: 18.75,
    expiryDate: "2024-12-30",
    batchNo: "MF2024-002",
    status: "Low Stock"
  },
  {
    id: "M003",
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    manufacturer: "GSK",
    stock: 0,
    minStock: 75,
    price: 32.50,
    expiryDate: "2025-03-20",
    batchNo: "AX2024-003",
    status: "Out of Stock"
  },
  {
    id: "M004",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    manufacturer: "Johnson & Johnson",
    stock: 280,
    minStock: 100,
    price: 12.99,
    expiryDate: "2025-06-10",
    batchNo: "IB2024-004",
    status: "In Stock"
  }
];

const prescriptions = [
  {
    id: "RX001",
    patient: "John Smith",
    patientId: "P001",
    doctor: "Dr. Sarah Wilson",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet daily",
    quantity: 30,
    date: "2024-01-19",
    status: "Ready",
    total: 25.99
  },
  {
    id: "RX002",
    patient: "Emily Davis",
    patientId: "P002",
    medication: "Metformin 500mg",
    dosage: "2 tablets daily",
    quantity: 60,
    date: "2024-01-19",
    status: "Dispensed",
    total: 37.50
  }
];

const getStockStatus = (stock: number, minStock: number) => {
  if (stock === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  } else if (stock <= minStock) {
    return <Badge className="bg-orange-500 text-white">Low Stock</Badge>;
  } else {
    return <Badge className="bg-success text-white">In Stock</Badge>;
  }
};

const getPrescriptionStatus = (status: string) => {
  switch (status) {
    case "Ready":
      return <Badge className="bg-success text-white">Ready</Badge>;
    case "Dispensed":
      return <Badge className="bg-primary text-white">Dispensed</Badge>;
    case "Pending":
      return <Badge className="bg-medical-accent text-white">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPrescriptions = prescriptions.filter(rx =>
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedication = () => {
    toast({
      title: "Medication Added",
      description: "New medication has been added to inventory.",
    });
  };

  const handleDispensePrescription = (prescription: any) => {
    toast({
      title: "Prescription Dispensed",
      description: `${prescription.medication} dispensed to ${prescription.patient}`,
    });
  };

  const handleRestockAlert = (medication: any) => {
    toast({
      title: "Restock Alert",
      description: `Low stock alert for ${medication.name}. Current: ${medication.stock}`,
    });
  };

  const lowStockCount = medications.filter(med => med.stock <= med.minStock).length;
  const outOfStockCount = medications.filter(med => med.stock === 0).length;

  const handleFilterPharmacy = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering pharmacy items by selected criteria.",
    });
  };

  const handleViewMedication = (medication: any) => {
    toast({
      title: "View Medication",
      description: `Opening details for ${medication.name}`,
    });
  };

  const handleEditMedication = (medication: any) => {
    toast({
      title: "Edit Medication",
      description: `Editing details for ${medication.name}`,
    });
  };

  const handleViewPrescription = (prescription: any) => {
    toast({
      title: "View Prescription",
      description: `Opening prescription details for ${prescription.patient}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacy Management</h1>
          <p className="text-muted-foreground">Manage medications, inventory, and prescriptions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Medication Name</label>
                <Input placeholder="e.g., Lisinopril 10mg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input placeholder="Cardiovascular, Diabetes, etc." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Manufacturer</label>
                <Input placeholder="Pfizer Inc., etc." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Batch Number</label>
                <Input placeholder="Batch identification" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Stock</label>
                <Input type="number" placeholder="500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Stock</label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price per Unit</label>
                <Input type="number" step="0.01" placeholder="25.99" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input type="date" />
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-primary" onClick={handleAddMedication}>
                  Add Medication
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
                <p className="text-sm text-muted-foreground">Total Medications</p>
                <p className="text-2xl font-bold">{medications.length}</p>
              </div>
              <Pill className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-500">{lowStockCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{outOfStockCount}</p>
              </div>
              <Package className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Sales</p>
                <p className="text-2xl font-bold">$1,247</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "inventory" ? "default" : "outline"}
          onClick={() => setActiveTab("inventory")}
          className={activeTab === "inventory" ? "bg-gradient-primary" : ""}
        >
          Inventory
        </Button>
        <Button
          variant={activeTab === "prescriptions" ? "default" : "outline"}
          onClick={() => setActiveTab("prescriptions")}
          className={activeTab === "prescriptions" ? "bg-gradient-primary" : ""}
        >
          Prescriptions
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={activeTab === "inventory" ? "Search medications..." : "Search prescriptions..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleFilterPharmacy}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "inventory" ? (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Medication Inventory ({filteredMedications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.map((medication) => (
                  <TableRow key={medication.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-muted-foreground">{medication.manufacturer}</p>
                      </div>
                    </TableCell>
                    <TableCell>{medication.category}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{medication.stock}</p>
                        <p className="text-sm text-muted-foreground">Min: {medication.minStock}</p>
                      </div>
                    </TableCell>
                    <TableCell>${medication.price}</TableCell>
                    <TableCell>{medication.expiryDate}</TableCell>
                    <TableCell>{getStockStatus(medication.stock, medication.minStock)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewMedication(medication)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditMedication(medication)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {medication.stock <= medication.minStock && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRestockAlert(medication)}
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Prescriptions ({filteredPrescriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{prescription.patient}</p>
                        <p className="text-sm text-muted-foreground">{prescription.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{prescription.doctor}</TableCell>
                    <TableCell>{prescription.medication}</TableCell>
                    <TableCell>{prescription.dosage}</TableCell>
                    <TableCell>{prescription.quantity}</TableCell>
                    <TableCell>${prescription.total}</TableCell>
                    <TableCell>{getPrescriptionStatus(prescription.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {prescription.status === "Ready" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDispensePrescription(prescription)}
                          >
                            Dispense
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleViewPrescription(prescription)}>
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
      )}
    </div>
  );
}