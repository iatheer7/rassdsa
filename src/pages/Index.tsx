import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import SensorCard from "@/components/SensorCard";
import AlertsPanel from "@/components/AlertsPanel";
import CitizenReports from "@/components/CitizenReports";
import AgencyDashboard from "@/components/AgencyDashboard";
import EnvironmentalMap from "@/components/EnvironmentalMap";

const Index = () => {
  // بيانات الحساسات التجريبية
  const sensorData = [
    {
      id: "1",
      type: "temperature" as const,
      value: 48,
      unit: "°C",
      status: "critical" as const,
      location: "غابة العرعر الشمالية",
      timestamp: "منذ دقيقتين",
      icon: "🌡️"
    },
    {
      id: "2", 
      type: "humidity" as const,
      value: 85,
      unit: "%",
      status: "warning" as const,
      location: "وادي الأحمر",
      timestamp: "منذ 5 دقائق",
      icon: "💧"
    },
    {
      id: "3",
      type: "smoke" as const,
      value: 150,
      unit: "ppm",
      status: "critical" as const,
      location: "منطقة السودة",
      timestamp: "منذ دقيقة",
      icon: "💨"
    },
    {
      id: "4",
      type: "vibration" as const,
      value: 0.2,
      unit: "Hz",
      status: "normal" as const,
      location: "محمية رجال ألمع",
      timestamp: "منذ 3 دقائق",
      icon: "📳"
    },
    {
      id: "5",
      type: "air_quality" as const,
      value: 65,
      unit: "AQI",
      status: "warning" as const,
      location: "طريق الملك فهد",
      timestamp: "منذ 4 دقائق",
      icon: "🌬️"
    }
  ];

  // بيانات التنبيهات التجريبية
  const alertsData = [
    {
      id: "1",
      type: "fire" as const,
      title: "حريق محتمل في منطقة السودة",
      description: "ارتفاع شديد في درجة الحرارة مع كشف دخان كثيف",
      severity: "critical" as const,
      location: "منطقة السودة، القطاع الجنوبي",
      coordinates: { lat: 18.2084, lng: 42.6055 },
      timestamp: "منذ دقيقة واحدة",
      status: "active" as const,
      assignedAgency: "الدفاع المدني"
    },
    {
      id: "2",
      type: "illegal_cutting" as const,
      title: "نشاط مشبوه في وادي الأحمر",
      description: "اهتزازات غير طبيعية تشير لوجود معدات ثقيلة",
      severity: "high" as const,
      location: "وادي الأحمر، المنطقة الوسطى",
      coordinates: { lat: 18.2184, lng: 42.6155 },
      timestamp: "منذ 15 دقيقة",
      status: "active" as const,
      assignedAgency: "البيئة والمياه والزراعة"
    }
  ];

  const handleViewAlert = (alert: any) => {
    // يمكن إضافة منطق لعرض تفاصيل التنبيه أو فتح الخريطة
    console.log("عرض تفاصيل التنبيه:", alert);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="reports">بلاغات المواطنين</TabsTrigger>
            <TabsTrigger value="agencies">الجهات المختصة</TabsTrigger>
            <TabsTrigger value="map">الخريطة التفاعلية</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* الخريطة البيئية */}
            <EnvironmentalMap />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* الحساسات */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">قراءات الحساسات اللحظية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sensorData.map((sensor) => (
                    <SensorCard key={sensor.id} sensor={sensor} />
                  ))}
                </div>
              </div>
              
              {/* التنبيهات */}
              <div className="space-y-4">
                <AlertsPanel alerts={alertsData} onViewAlert={handleViewAlert} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <CitizenReports />
          </TabsContent>

          <TabsContent value="agencies">
            <AgencyDashboard />
          </TabsContent>

          <TabsContent value="map">
            <EnvironmentalMap />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
