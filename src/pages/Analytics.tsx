import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Activity, 
  DollarSign,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Sample data
const monthlyPatients = [
  { month: "Jan", patients: 240, appointments: 320, revenue: 45000 },
  { month: "Feb", patients: 280, appointments: 380, revenue: 52000 },
  { month: "Mar", patients: 320, appointments: 420, revenue: 58000 },
  { month: "Apr", patients: 290, appointments: 390, revenue: 54000 },
  { month: "May", patients: 350, appointments: 460, revenue: 65000 },
  { month: "Jun", patients: 380, appointments: 500, revenue: 70000 }
];

const departmentData = [
  { name: "Cardiology", value: 25, patients: 450, color: "#3b82f6" },
  { name: "Emergency", value: 20, patients: 360, color: "#ef4444" },
  { name: "Surgery", value: 18, patients: 324, color: "#10b981" },
  { name: "Pediatrics", value: 15, patients: 270, color: "#f59e0b" },
  { name: "Orthopedics", value: 12, patients: 216, color: "#8b5cf6" },
  { name: "Other", value: 10, patients: 180, color: "#6b7280" }
];

const patientSatisfaction = [
  { month: "Jan", satisfaction: 4.2 },
  { month: "Feb", satisfaction: 4.3 },
  { month: "Mar", satisfaction: 4.1 },
  { month: "Apr", satisfaction: 4.4 },
  { month: "May", satisfaction: 4.5 },
  { month: "Jun", satisfaction: 4.6 }
];

export default function Analytics() {
  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "Analytics report is being generated and will be downloaded shortly.",
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Refreshing Data",
      description: "Analytics data has been refreshed with the latest information.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Hospital performance insights and metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90" onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$374,000</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success">+12.5%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                <p className="text-2xl font-bold">4.6/5</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success">+0.3</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                <p className="text-2xl font-bold">18 min</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success">-5 min</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-medical-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bed Occupancy</p>
                <p className="text-2xl font-bold">85%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-medical-accent mr-1" />
                  <span className="text-sm text-medical-accent">+3%</span>
                </div>
              </div>
              <Calendar className="w-8 h-8 text-medical-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Monthly Patient & Revenue Trends</span>
              <Badge variant="outline">Last 6 Months</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyPatients}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="patients"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stackId="2"
                  stroke="hsl(var(--medical-accent))"
                  fill="hsl(var(--medical-accent))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Patient Distribution by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPatients}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Satisfaction Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Patient Satisfaction Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientSatisfaction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Department Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{dept.name}</h3>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  ></div>
                </div>
                <p className="text-2xl font-bold">{dept.patients}</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <div className="mt-2">
                  <Badge variant="outline">{dept.value}% of total</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}