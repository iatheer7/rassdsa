import { Shield, Leaf, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="w-8 h-8" />
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">رَصــد</h1>
              <p className="text-sm text-muted-foreground">منصة المراقبة البيئية الذكية - منطقة عسير</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">هاكاثون عسير تبتكر 2025</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;