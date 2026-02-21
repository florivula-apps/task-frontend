# Task Management Frontend

Build a task management UI with the following features:

## Pages

### Tasks Page (`src/pages/Tasks.tsx`)

Create a clean task management interface with:

1. **Task List** - Display tasks in cards/rows with:
   - Title, description (truncated), status badge, priority badge, due date
   - Quick actions: Edit, Delete, Toggle status
   - Filter by status (All, To Do, In Progress, Done)
   - Filter by priority (All, Low, Medium, High)
   - Sort by: due date, priority, created date

2. **Add Task Form** - Either in a dialog or inline:
   - Title (required)
   - Description (optional textarea)
   - Status (select: To Do, In Progress, Done)
   - Priority (select: Low, Medium, High)
   - Due Date (date picker using shadcn/ui)
   - Save/Cancel buttons

3. **Edit Task** - Same form but populated with existing data, shown in a dialog

## API Hooks (`src/hooks/useApi.ts`)

Add these hooks using React Query:

```typescript
export function useTasks(filters?: { status?: string; priority?: string }) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters?.status) params.set('status', filters.status);
      if (filters?.priority) params.set('priority', filters.priority);
      return request(`/tasks?${params}`);
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => request('/tasks', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => request(`/tasks/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
```

## Routing

Update `src/App.tsx` to add Tasks route:

```typescript
<Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
```

## UI Components

Use shadcn/ui components:
- `Card` for task items
- `Badge` for status/priority
- `Dialog` for add/edit forms
- `Button` for actions
- `Select` for dropdowns
- Date picker component (add with `npx shadcn@latest add calendar` + `npx shadcn@latest add popover`)

## Steps

1. Add API hooks to `useApi.ts`
2. Create `Tasks.tsx` page with list + filters
3. Add create/edit dialogs
4. Style with Tailwind (clean, modern look)
5. Add route to App.tsx
6. Update Dashboard to link to Tasks page
7. Test locally with `npm run dev`
8. Commit and push when ready

Keep the UI clean and simple. Don't over-engineer.
