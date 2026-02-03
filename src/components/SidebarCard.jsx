import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const SidebarCard = ({ icon: Icon, title, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          {Icon && <Icon className="w-4 h-4" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
