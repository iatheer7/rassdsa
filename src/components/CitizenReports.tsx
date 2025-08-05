import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Phone, Award, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  type: string;
  description: string;
  location: string;
  reporterName: string;
  reporterPhone: string;
  timestamp: string;
  status: "pending" | "investigating" | "resolved";
  priority: "low" | "medium" | "high";
  assignedAgency: string;
}

const CitizenReports = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    reporterName: "",
    reporterPhone: "",
  });

  const reportTypes = [
    { value: "fire", label: "حريق", icon: "🔥", agency: "الدفاع المدني" },
    { value: "illegal_cutting", label: "قطع أشجار غير مصرح", icon: "🪓", agency: "البيئة والمياه والزراعة" },
    { value: "pollution", label: "تلوث بيئي", icon: "☣️", agency: "البيئة والمياه والزراعة" },
    { value: "illegal_hunting", label: "صيد غير مشروع", icon: "🦌", agency: "البيئة والمياه والزراعة" },
    { value: "waste_dumping", label: "إلقاء نفايات", icon: "🗑️", agency: "البلدية" },
    { value: "road_damage", label: "تلف في الطريق", icon: "🛣️", agency: "النقل والخدمات اللوجستية" },
    { value: "water_leak", label: "تسرب مياه", icon: "💧", agency: "المياه والصرف الصحي" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال البلاغ
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedType = reportTypes.find(type => type.value === formData.type);
    
    toast({
      title: "تم إرسال البلاغ بنجاح! 🎉",
      description: `سيتم توجيه البلاغ إلى ${selectedType?.agency} فوراً. شكراً لمساهمتك في حماية البيئة!`,
    });

    // إعادة تعيين النموذج
    setFormData({
      type: "",
      description: "",
      location: "",
      reporterName: "",
      reporterPhone: "",
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedType = reportTypes.find(type => type.value === formData.type);

  return (
    <div className="space-y-6">
      {/* نموذج البلاغ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <CardTitle>رفع بلاغ بيئي</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            ساهم في حماية البيئة من خلال الإبلاغ عن أي مخالفات أو مشاكل بيئية
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reporterName">الاسم</Label>
                <Input
                  id="reporterName"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange("reporterName", e.target.value)}
                  placeholder="أدخل اسمك"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reporterPhone">رقم الهاتف</Label>
                <Input
                  id="reporterPhone"
                  value={formData.reporterPhone}
                  onChange={(e) => handleInputChange("reporterPhone", e.target.value)}
                  placeholder="05xxxxxxxx"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">نوع البلاغ</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع البلاغ" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedType && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">الجهة المختصة:</span> {selectedType.agency}
                  </p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="location">الموقع</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="وصف مفصل للموقع (مثل: طريق الملك فهد، بجانب محطة الوقود)"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">وصف البلاغ</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="اكتب وصفاً مفصلاً للمشكلة البيئية..."
                rows={4}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "جاري الإرسال..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  إرسال البلاغ
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* نظام النقاط والمكافآت */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold text-foreground">نظام نقاط البيئة</h3>
                <p className="text-sm text-muted-foreground">اكسب نقاط مقابل كل بلاغ صحيح واحمي البيئة</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">+50</div>
              <div className="text-sm text-muted-foreground">نقطة لكل بلاغ</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenReports;