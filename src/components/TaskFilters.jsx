import { useState, useEffect } from "react";
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

const TaskSearch = ({ onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

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

const TaskStatusFilter = ({ filter, onFilterChange }) => {
  return (
    <Field>
      <FieldLabel htmlFor="status-filter">Status</FieldLabel>
      <FieldContent>
        <Select value={filter} onValueChange={onFilterChange}>
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

export const TaskFilters = ({ filter, onFilterChange, onSearchChange }) => {
  return (
    <SidebarCard icon={Filter} title="Filters">
      <div className="space-y-4">
        <TaskSearch onSearchChange={onSearchChange} />
        <TaskStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>
    </SidebarCard>
  );
};
