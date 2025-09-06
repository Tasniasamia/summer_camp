"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// /**
//  * useFetch
//  * @param queryKey - Unique query key
//  * @param fetchMethod - Function that returns Promise (API call)
//  * @param params - Optional query params like page, limit, search
//  */
export const useFetch = (queryKey, fetchMethod, params = {}) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => fetchMethod(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
};

// /**
//  * useActionAsync
//  * @param actionMethod - API method (post/put/delete)
//  * @param queryKey - Query to invalidate after success
//  */
export const useActionAsync = (actionMethod, queryKey = null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await actionMethod(payload);
    },
    onSuccess: () => {
      if (queryKey) queryClient.invalidateQueries([queryKey]);
    },
  });

  // Async wrapper for easier await usage
  const mutateAsync = async (payload) => {
    return await mutation.mutateAsync(payload);
  };

  return { ...mutation, mutateAsync };
};
