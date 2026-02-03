import { useTaskStore, selectIsLoading } from "@/stores/taskStore";
import { SidebarCard } from "@/components/SidebarCard";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";

export const TaskStats = () => {
  const isLoading = useTaskStore(selectIsLoading);
  const total = useTaskStore((state) => state.tasks.length);
  const completed = useTaskStore(
    (state) => state.tasks.filter((t) => t.completed).length
  );

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <SidebarCard icon={BarChart3} title="Stats">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          {isLoading ? (
            <Skeleton className="h-5 w-8" />
          ) : (
            <span className="font-semibold">{total}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Completed</span>
          {isLoading ? (
            <Skeleton className="h-5 w-8" />
          ) : (
            <span className="font-semibold text-green-600">{completed}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Progress</span>
          {isLoading ? (
            <Skeleton className="h-5 w-12" />
          ) : (
            <span className="font-semibold">{completionRate}%</span>
          )}
        </div>
      </div>
    </SidebarCard>
  );
};
