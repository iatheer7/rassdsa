import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Clock, Eye } from "lucide-react";

interface Alert {
  id: string;
  type: "fire" | "smoke" | "illegal_cutting" | "pollution" | "unusual_activity";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  status: "active" | "investigating" | "resolved";
  assignedAgency: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onViewAlert: (alert: Alert) => void;
}

const AlertsPanel = ({ alerts, onViewAlert }: AlertsPanelProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "critical":
        return "bg-destructive text-destructive-foreground animate-pulse";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "low":
        return "منخفض";
      case "medium":
        return "متوسط";
      case "high":
        return "عالي";
      case "critical":
        return "حرج";
      default:
        return "غير محدد";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "fire":
        return "🔥";
      case "smoke":
        return "💨";
      case "illegal_cutting":
        return "🪓";
      case "pollution":
        return "☣️";
      case "unusual_activity":
        return "⚠️";
      default:
        return "🚨";
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === "active");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <CardTitle>التنبيهات النشطة ({activeAlerts.length})</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>لا توجد تنبيهات نشطة حالياً</p>
              <p className="text-sm">جميع المناطق آمنة</p>
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-destructive">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getAlertIcon(alert.type)}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {getSeverityText(alert.severity)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">الجهة المختصة: </span>
                      <span className="font-medium text-primary">{alert.assignedAgency}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onViewAlert(alert)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      عرض
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;