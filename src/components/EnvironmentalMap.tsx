import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, Droplets, Wind, Activity, Eye } from "lucide-react";

interface MapSensor {
  id: string;
  name: string;
  type: "temperature" | "humidity" | "smoke" | "vibration" | "air_quality";
  position: { x: number; y: number };
  status: "normal" | "warning" | "critical";
  value: number;
  unit: string;
}

interface MapAlert {
  id: string;
  position: { x: number; y: number };
  type: "fire" | "illegal_activity" | "pollution";
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
}

const EnvironmentalMap = () => {
  const sensors: MapSensor[] = [
    { id: "1", name: "غابة العرعر الشمالية", type: "temperature", position: { x: 25, y: 20 }, status: "normal", value: 24, unit: "°C" },
    { id: "2", name: "وادي الأحمر", type: "humidity", position: { x: 60, y: 30 }, status: "warning", value: 85, unit: "%" },
    { id: "3", name: "منطقة السودة", type: "smoke", position: { x: 40, y: 50 }, status: "critical", value: 150, unit: "ppm" },
    { id: "4", name: "محمية رجال ألمع", type: "vibration", position: { x: 70, y: 60 }, status: "normal", value: 0.2, unit: "Hz" },
    { id: "5", name: "طريق الملك فهد", type: "air_quality", position: { x: 30, y: 70 }, status: "warning", value: 65, unit: "AQI" },
  ];

  const alerts: MapAlert[] = [
    { id: "1", position: { x: 40, y: 50 }, type: "fire", severity: "critical", timestamp: "منذ 5 دق" },
    { id: "2", position: { x: 60, y: 30 }, type: "illegal_activity", severity: "high", timestamp: "منذ 15 دق" },
  ];

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "temperature": return <Thermometer className="w-4 h-4" />;
      case "humidity": return <Droplets className="w-4 h-4" />;
      case "smoke": return <Wind className="w-4 h-4" />;
      case "vibration": return <Activity className="w-4 h-4" />;
      case "air_quality": return <Wind className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getSensorColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success border-success";
      case "warning": return "bg-warning border-warning";
      case "critical": return "bg-destructive border-destructive animate-pulse";
      default: return "bg-muted border-muted";
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive animate-pulse";
      case "high": return "bg-destructive";
      case "medium": return "bg-warning";
      case "low": return "bg-accent";
      default: return "bg-muted";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "fire": return "🔥";
      case "illegal_activity": return "⚠️";
      case "pollution": return "☣️";
      default: return "🚨";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <CardTitle>خريطة المراقبة البيئية - منطقة عسير</CardTitle>
          </div>
          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            عرض الخريطة الكاملة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 h-96 overflow-hidden">
          {/* خلفية الخريطة */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* جبال */}
              <path d="M0,80 Q20,60 40,70 T80,65 L100,75 L100,100 L0,100 Z" fill="#10b981" opacity="0.3" />
              <path d="M0,85 Q30,75 60,80 T100,85 L100,100 L0,100 Z" fill="#059669" opacity="0.5" />
              
              {/* غابات */}
              <circle cx="25" cy="65" r="8" fill="#047857" opacity="0.4" />
              <circle cx="45" cy="55" r="12" fill="#047857" opacity="0.4" />
              <circle cx="70" cy="70" r="10" fill="#047857" opacity="0.4" />
              
              {/* طرق */}
              <path d="M0,75 Q50,70 100,80" stroke="#6b7280" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M20,0 Q30,50 40,100" stroke="#6b7280" strokeWidth="0.5" fill="none" opacity="0.6" />
            </svg>
          </div>

          {/* الحساسات */}
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${sensor.position.x}%`, top: `${sensor.position.y}%` }}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white shadow-lg ${getSensorColor(sensor.status)}`}>
                {getSensorIcon(sensor.type)}
              </div>
              
              {/* معلومات الحساس عند التمرير */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-48">
                  <h4 className="font-medium text-sm mb-1">{sensor.name}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">القراءة:</span>
                    <span className="font-medium">{sensor.value} {sensor.unit}</span>
                  </div>
                  <Badge className={`mt-1 text-xs ${getSensorColor(sensor.status).replace('bg-', 'bg-').replace('border-', '')}`}>
                    {sensor.status === "normal" ? "طبيعي" : sensor.status === "warning" ? "تحذير" : "خطر"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {/* التنبيهات النشطة */}
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${alert.position.x}%`, top: `${alert.position.y}%` }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${getAlertColor(alert.severity)}`}>
                <span className="text-lg">{getAlertIcon(alert.type)}</span>
              </div>
              
              {/* تفاصيل التنبيه */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-40">
                  <h4 className="font-medium text-sm mb-1">تنبيه نشط</h4>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                  <Badge className={`mt-1 text-xs ${getAlertColor(alert.severity)}`}>
                    {alert.severity === "critical" ? "حرج" : alert.severity === "high" ? "عالي" : "متوسط"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {/* وسائل الإيضاح */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
            <h4 className="font-medium mb-2">وسائل الإيضاح</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>طبيعي</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span>تحذير</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span>خطر</span>
              </div>
            </div>
          </div>

          {/* إحصائيات سريعة */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="font-bold text-success">{sensors.filter(s => s.status === "normal").length}</div>
                <div className="text-muted-foreground">آمن</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-warning">{sensors.filter(s => s.status === "warning").length}</div>
                <div className="text-muted-foreground">تحذير</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-destructive">{sensors.filter(s => s.status === "critical").length}</div>
                <div className="text-muted-foreground">خطر</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-accent">{alerts.length}</div>
                <div className="text-muted-foreground">تنبيه</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          آخر تحديث: الآن • {sensors.length} حساس نشط • {alerts.length} تنبيه
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalMap;