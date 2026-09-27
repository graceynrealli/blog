"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";

import type { ActionResult } from "../types";

/**
 * Wrap a Server Action that returns ActionResult: failures become thrown
 * errors (so `mutation.error` works) and the given queries are refetched.
 */
export function useActionMutation<TArgs, TData>(
  action: (args: TArgs) => Promise<ActionResult<TData>>,
  invalidate: QueryKey[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: TArgs) => {
      const result = await action(args);
      if (!result.ok) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => Promise.all(invalidate.map((queryKey) => queryClient.invalidateQueries({ queryKey }))),
  });
}
