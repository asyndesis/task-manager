## Task Manager

### Setup Instructions

```bash
npm install
npm run dev
```

### Features Implemented

- ✅ Add tasks with title and priority (High/Medium/Low)
- ✅ Display tasks in organized list
- ✅ Toggle task completion status
- ✅ Delete tasks
- ✅ Task counter (total, completed, progress %)
- ✅ Status filter (All/Completed/Incomplete)
- ✅ Search filter with debouncing

### Technical Stack

- React + Vite
- Tailwind CSS v4 with provided task status colors
- shadcn/ui components
- useState for state management
- Responsive layout (mobile: stacked, desktop: sidebar + main)

### Known Limitations

- LocalStorage persistence not yet implemented
- Inline task editing not yet implemented
