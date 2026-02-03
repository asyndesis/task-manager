import { Card } from "@/components/ui/card";

export const TaskStats = ({ stats }) => {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <Card className="p-4">
      <h2 className="text-md font-medium text-gray-500">Stats</h2>
      <div className="text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold">{stats.total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Completed</span>
          <span className="font-semibold text-green-600">
            {stats.completed}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold">{completionRate}%</span>
        </div>
      </div>
    </Card>
  );
};
