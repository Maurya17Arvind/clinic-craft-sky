import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const recentActivities = [
  {
    id: 1,
    patient: "John Smith",
    action: "Appointment scheduled",
    doctor: "Dr. Sarah Wilson",
    time: "10 minutes ago",
    type: "appointment",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 2,
    patient: "Emily Davis",
    action: "Lab results updated",
    doctor: "Dr. Michael Chen",
    time: "25 minutes ago",
    type: "lab",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 3,
    patient: "Robert Johnson",
    action: "Prescription refilled",
    doctor: "Dr. Lisa Rodriguez",
    time: "1 hour ago",
    type: "prescription",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 4,
    patient: "Maria Garcia",
    action: "Emergency visit",
    doctor: "Dr. James Thompson",
    time: "2 hours ago",
    type: "emergency",
    avatar: "/api/placeholder/32/32"
  }
];

const getActivityBadge = (type: string) => {
  switch (type) {
    case "appointment":
      return <Badge variant="secondary">Appointment</Badge>;
    case "lab":
      return <Badge className="bg-medical-accent text-white">Lab</Badge>;
    case "prescription":
      return <Badge className="bg-medical-primary text-white">Prescription</Badge>;
    case "emergency":
      return <Badge variant="destructive">Emergency</Badge>;
    default:
      return <Badge variant="outline">General</Badge>;
  }
};

export function RecentActivity() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="w-10 h-10">
              <AvatarImage src={activity.avatar} alt={activity.patient} />
              <AvatarFallback className="bg-gradient-primary text-white text-sm">
                {activity.patient.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.patient}</p>
                {getActivityBadge(activity.type)}
              </div>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
              <p className="text-xs text-muted-foreground">by {activity.doctor}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              {activity.time}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}