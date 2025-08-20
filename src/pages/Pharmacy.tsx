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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Eye, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const medications = [
  {
    id: "M001",
    name: "Amoxicillin",
    category: "Antibiotics",
    manufacturer: "PharmaCorp",
    stock: 150,
    status: "Available",
    price: 12.50,
    lastUpdated: "2024-01-10"
  },
  {
    id: "M002",
    name: "Ibuprofen",
    category: "Pain Relief",
    manufacturer: "MediCare Ltd.",
    stock: 80,
    status: "Available",
    price: 8.00,
    lastUpdated: "2024-01-15"
  },
  {
    id: "M003",
    name: "Metformin",
    category: "Diabetes",
    manufacturer: "Glucosafe Inc.",
    stock: 220,
    status: "Available",
    price: 15.75,
    lastUpdated: "2024-01-20"
  },
  {
    id: "M004",
    name: "Vitamin D3",
    category: "Vitamins",
    manufacturer: "VitaPlus Co.",
    stock: 50,
    status: "Low Stock",
    price: 5.20,
    lastUpdated: "2024-01-22"
  },
  {
    id: "M005",
    name: "Aspirin",
    category: "Pain Relief",
    manufacturer: "Bayer",
    stock: 0,
    status: "Out of Stock",
    price: 6.50,
    lastUpdated: "2024-01-25"
  },
  {
    id: "M006",
    name: "Lisinopril",
    category: "Heart Medication",
    manufacturer: "HeartGuard Pharma",
    stock: 300,
    status: "Available",
    price: 22.00,
    lastUpdated: "2024-01-28"
  },
  {
    id: "M007",
    name: "Ciprofloxacin",
    category: "Antibiotics",
    manufacturer: "Global Pharma",
    stock: 20,
    status: "Low Stock",
    price: 18.50,
    lastUpdated: "2024-01-30"
  },
  {
    id: "M008",
    name: "Omeprazole",
    category: "Gastrointestinal",
    manufacturer: "DigestWell Inc.",
    stock: 120,
    status: "Available",
    price: 9.25,
    lastUpdated: "2024-02-01"
  },
  {
    id: "M009",
    name: "Simvastatin",
    category: "Heart Medication",
    manufacturer: "CardioLife Ltd.",
    stock: 60,
    status: "Available",
    price: 25.00,
    lastUpdated: "2024-02-03"
  },
  {
    id: "M010",
    name: "Multivitamin",
    category: "Vitamins",
    manufacturer: "HealthFirst Corp.",
    stock: 10,
    status: "Expired",
    price: 7.80,
    lastUpdated: "2023-12-01"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Available":
      return <Badge className="bg-success text-white">Available</Badge>;
    case "Low Stock":
      return <Badge className="bg-warning text-white">Low Stock</Badge>;
    case "Out of Stock":
      return <Badge variant="destructive">Out of Stock</Badge>;
    case "Expired":
      return <Badge variant="secondary">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const handleAddMedication = () => {
    toast({
      title: "Medication Added",
      description: "New medication has been successfully added to inventory.",
    });
  };

  const handleFilterMedications = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering medications by selected criteria.",
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

  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || categoryFilter === "all" || medication.category === categoryFilter;
    const matchesStatus = !statusFilter || statusFilter === "all" || medication.status === statusFilter;
    const matchesStock = !stockFilter || stockFilter === "all" ||
      (stockFilter === "low" && medication.stock < 50) ||
      (stockFilter === "medium" && medication.stock >= 50 && medication.stock < 200) ||
      (stockFilter === "high" && medication.stock >= 200);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacy</h1>
          <p className="text-muted-foreground">Manage medication inventory and details</p>
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
                <Input placeholder="Enter medication name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input placeholder="Enter category" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Manufacturer</label>
                <Input placeholder="Enter manufacturer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock</label>
                <Input type="number" placeholder="Enter stock quantity" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input type="number" placeholder="Enter price" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Input placeholder="Enter status" />
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-primary" onClick={handleAddMedication}>Add Medication</Button>
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
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">{medications.filter(m => m.status === "Available").length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-warning">{medications.filter(m => m.status === "Low Stock").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{medications.filter(m => m.status === "Out of Stock").length}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medications by name, ID, or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                <SelectItem value="Heart Medication">Heart Medication</SelectItem>
                <SelectItem value="Diabetes">Diabetes</SelectItem>
                <SelectItem value="Vitamins">Vitamins</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stock Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="low">Low (&lt;50)</SelectItem>
                <SelectItem value="medium">Medium (50-200)</SelectItem>
                <SelectItem value="high">High (200+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medications Table */}
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
                <TableHead>Manufacturer</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.map((medication) => (
                <TableRow key={medication.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Package className="w-6 h-6" />
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-muted-foreground">{medication.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{medication.category}</TableCell>
                  <TableCell>{medication.manufacturer}</TableCell>
                  <TableCell>{medication.stock}</TableCell>
                  <TableCell>{getStatusBadge(medication.status)}</TableCell>
                  <TableCell>${medication.price}</TableCell>
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
                            <DialogTitle>Medication Details - {medication.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Medication ID</label>
                                <p className="text-sm">{medication.id}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="text-sm">{medication.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Category</label>
                                <p className="text-sm">{medication.category}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Manufacturer</label>
                                <p className="text-sm">{medication.manufacturer}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Stock</label>
                                <p className="text-sm">{medication.stock}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <p className="text-sm">{medication.status}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Price</label>
                                <p className="text-sm">${medication.price}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                <p className="text-sm">{medication.lastUpdated}</p>
                              </div>
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
                            <DialogTitle>Edit Medication - {medication.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Medication Name</label>
                              <Input defaultValue={medication.name} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Category</label>
                              <Input defaultValue={medication.category} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Manufacturer</label>
                              <Input defaultValue={medication.manufacturer} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Stock</label>
                              <Input type="number" defaultValue={medication.stock} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Price</label>
                              <Input type="number" defaultValue={medication.price} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Status</label>
                              <Select defaultValue={medication.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Available">Available</SelectItem>
                                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                  <SelectItem value="Expired">Expired</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-gradient-primary" onClick={() => handleEditMedication(medication)}>Update Medication</Button>
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
