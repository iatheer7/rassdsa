import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

interface SensorData {
  id: string;
  type: "temperature" | "humidity" | "smoke" | "vibration" | "air_quality";
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  location: string;
  timestamp: string;
  icon: string;
}

interface SensorCardProps {
  sensor: SensorData;
}

const SensorCard = ({ sensor }: SensorCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "طبيعي";
      case "warning":
        return "تحذير";
      case "critical":
        return "خطر";
      default:
        return "غير معروف";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{sensor.icon}</span>
            <CardTitle className="text-lg">{getSensorTypeText(sensor.type)}</CardTitle>
          </div>
          <Badge className={getStatusColor(sensor.status)}>
            {getStatusText(sensor.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {sensor.value}
              <span className="text-lg text-muted-foreground ml-1">{sensor.unit}</span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{sensor.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{sensor.timestamp}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getSensorTypeText = (type: string) => {
  switch (type) {
    case "temperature":
      return "درجة الحرارة";
    case "humidity":
      return "الرطوبة";
    case "smoke":
      return "كشف الدخان";
    case "vibration":
      return "الاهتزاز";
    case "air_quality":
      return "جودة الهواء";
    default:
      return "حساس غير معروف";
  }
};

export default SensorCard;