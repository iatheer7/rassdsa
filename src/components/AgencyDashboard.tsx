import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Building, Droplets, Trees, Truck, Phone, Clock, MapPin, CheckCircle, AlertTriangle } from "lucide-react";

interface AgencyReport {
  id: string;
  type: string;
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "investigating" | "resolved";
  timestamp: string;
  reporterInfo: {
    name: string;
    phone: string;
  };
  assignedTo?: string;
}

const AgencyDashboard = () => {
  const [selectedAgency, setSelectedAgency] = useState("civil_defense");
  const [reports, setReports] = useState<AgencyReport[]>([
    {
      id: "1",
      type: "fire",
      title: "حريق في منطقة الغابة",
      description: "دخان كثيف مشاهد بالقرب من طريق العقبة",
      location: "طريق العقبة، كيلو 15",
      priority: "critical",
      status: "pending",
      timestamp: "منذ 5 دقائق",
      reporterInfo: { name: "أحمد محمد", phone: "0501234567" }
    },
    {
      id: "2",
      type: "illegal_cutting",
      title: "قطع أشجار غير مصرح",
      description: "مشاهدة معدات ثقيلة تقوم بقطع أشجار في المحمية",
      location: "محمية عسير الطبيعية، القطاع الشمالي",
      priority: "high",
      status: "investigating",
      timestamp: "منذ 30 دقيقة",
      reporterInfo: { name: "فاطمة علي", phone: "0509876543" },
      assignedTo: "فريق البيئة رقم 3"
    }
  ]);

  const agencies = [
    { 
      id: "civil_defense", 
      name: "الدفاع المدني", 
      icon: Shield, 
      color: "text-red-600",
      types: ["fire", "emergency", "rescue"]
    },
    { 
      id: "municipality", 
      name: "البلدية", 
      icon: Building, 
      color: "text-blue-600",
      types: ["waste_dumping", "road_damage", "public_facilities"]
    },
    { 
      id: "environment", 
      name: "البيئة والمياه والزراعة", 
      icon: Trees, 
      color: "text-green-600",
      types: ["illegal_cutting", "pollution", "illegal_hunting"]
    },
    { 
      id: "water", 
      name: "المياه والصرف الصحي", 
      icon: Droplets, 
      color: "text-cyan-600",
      types: ["water_leak", "sewage_problems"]
    },
    { 
      id: "transport", 
      name: "النقل والخدمات اللوجستية", 
      icon: Truck, 
      color: "text-purple-600",
      types: ["road_damage", "traffic_issues"]
    }
  ];

  const currentAgency = agencies.find(agency => agency.id === selectedAgency);
  const agencyReports = reports.filter(report => 
    currentAgency?.types.includes(report.type)
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "critical": return "حرج";
      case "high": return "عالي";
      case "medium": return "متوسط";
      case "low": return "منخفض";
      default: return "غير محدد";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "investigating":
        return "bg-accent text-accent-foreground";
      case "resolved":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "في الانتظار";
      case "investigating": return "قيد التحقيق";
      case "resolved": return "تم الحل";
      default: return "غير محدد";
    }
  };

  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus as any } : report
    ));
  };

  const handleAssign = (reportId: string, assignee: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, assignedTo: assignee, status: "investigating" } : report
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>لوحة تحكم الجهات المختصة</CardTitle>
          <Select value={selectedAgency} onValueChange={setSelectedAgency}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="اختر الجهة" />
            </SelectTrigger>
            <SelectContent>
              {agencies.map((agency) => {
                const IconComponent = agency.icon;
                return (
                  <SelectItem key={agency.id} value={agency.id}>
                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${agency.color}`} />
                      <span>{agency.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">البلاغات الواردة</TabsTrigger>
            <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
            <TabsTrigger value="teams">الفرق الميدانية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              {currentAgency && (
                <div className="flex items-center gap-2">
                  <currentAgency.icon className={`w-5 h-5 ${currentAgency.color}`} />
                  <span className="font-medium">{currentAgency.name}</span>
                </div>
              )}
              <Badge variant="outline">
                {agencyReports.length} بلاغ نشط
              </Badge>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {agencyReports.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>لا توجد بلاغات حالياً</p>
                  <p className="text-sm">جميع المهام مكتملة</p>
                </div>
              ) : (
                agencyReports.map((report) => (
                  <Card key={report.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{report.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{report.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getPriorityColor(report.priority)}>
                            {getPriorityText(report.priority)}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {getStatusText(report.status)}
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-muted p-3 rounded-md mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">بيانات المبلغ:</span>
                          <span>{report.reporterInfo.name}</span>
                          <span>-</span>
                          <span>{report.reporterInfo.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {report.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleStatusUpdate(report.id, "investigating")}
                            >
                              بدء التحقيق
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAssign(report.id, "فريق الاستجابة السريعة")}
                            >
                              تعيين فريق
                            </Button>
                          </>
                        )}
                        {report.status === "investigating" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusUpdate(report.id, "resolved")}
                          >
                            إغلاق البلاغ
                          </Button>
                        )}
                        {report.assignedTo && (
                          <Badge variant="secondary">
                            مُعيّن إلى: {report.assignedTo}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">2</div>
                  <div className="text-sm text-muted-foreground">بلاغات نشطة</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">15</div>
                  <div className="text-sm text-muted-foreground">تم حلها اليوم</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <div className="text-sm text-muted-foreground">معدل الاستجابة</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">فريق الاستجابة السريعة</h4>
                      <p className="text-sm text-muted-foreground">4 أعضاء - متاح</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">متاح</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">فريق البيئة رقم 3</h4>
                      <p className="text-sm text-muted-foreground">3 أعضاء - في مهمة</p>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">مشغول</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgencyDashboard;