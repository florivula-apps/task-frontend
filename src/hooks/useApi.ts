import { useQuery, useMutation, useQueryClient } from '@tantml:react-query';
import { authApi } from '@/lib/api';

// Example hook - customize for your app
export function useExample() {
  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      // Replace with your API call
      return { message: 'Hello from API' };
    },
  });
}

export function useExampleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      // Replace with your API call
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['example'] });
    },
  });
}
