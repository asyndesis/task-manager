import { useState, useEffect } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { SidebarCard } from "@/components/SidebarCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { FILTER } from "@/constants/taskConstants";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Filter } from "lucide-react";

const TaskSearch = () => {
  const setSearchTerm = useTaskStore((state) => state.setSearchTerm);
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  return (
    <Field>
      <FieldLabel htmlFor="search-filter">Search</FieldLabel>
      <FieldContent>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            id="search-filter"
            placeholder="Search tasks..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </InputGroup>
      </FieldContent>
    </Field>
  );
};

const TaskStatusFilter = () => {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <Field>
      <FieldLabel htmlFor="status-filter">Status</FieldLabel>
      <FieldContent>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger id="status-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER.ALL}>All Tasks</SelectItem>
            <SelectItem value={FILTER.COMPLETED}>Completed</SelectItem>
            <SelectItem value={FILTER.INCOMPLETE}>Incomplete</SelectItem>
          </SelectContent>
        </Select>
      </FieldContent>
    </Field>
  );
};

export const TaskFilters = () => {
  return (
    <SidebarCard icon={Filter} title="Filters">
      <div className="space-y-4">
        <TaskSearch />
        <TaskStatusFilter />
      </div>
    </SidebarCard>
  );
};
