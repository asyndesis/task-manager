## Task Manager

### Setup Instructions

```bash
npm install
npm run dev
```

### Features Implemented Phase 1

- ✅ Add tasks with title and priority (High/Medium/Low)
- ✅ Display tasks in organized list
- ✅ Toggle task completion status
- ✅ Delete tasks
- ✅ Task counter (total, completed, progress %)
- ✅ Status filter (All/Completed/Incomplete)
- ✅ Search filter with debouncing

### Features Implemented Phase 2

- ✅ Inline title editing
- ✅ Uses localstorage and pretends it's an api with fake delay (easier to transition to API later)
- ✅ Optimistic updates in useTasks.js

### Technical Stack

- React + Vite
- Tailwind CSS v4 with provided task status colors
- shadcn/ui components
- useState for state management
- Responsive layout (mobile: stacked, desktop: sidebar + main)

### Known Limitations

- No typescript. (Really would make code easier to debug)
- No tests. Time limitation made this though, but we should be testing at least unit on components and various functions in state-management
- No form validation (Should probably use zod)
- No feedback when things happen. (Would like to add toast messages when things are saved / updated etc...)
- Pretty ugly ui. It's basic, but at least we have shadcn and tailwind in place so that can be easily improved.
