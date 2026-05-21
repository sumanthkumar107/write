'use client';

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Thought } from '@/types';
import { PAGINATION_SIZE } from '@/lib/utils/constants';

const supabase = createClient();

interface FetchThoughtsParams {
  pageParam: number;
}

async function fetchThoughts({ pageParam = 0 }: FetchThoughtsParams) {
  const { data, error } = await supabase
    .from('thoughts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(pageParam, pageParam + PAGINATION_SIZE - 1);

  if (error) throw error;
  return data as Thought[];
}

export function useThoughts() {
  return useQuery({
    queryKey: ['thoughts'],
    queryFn: () => fetchThoughts({ pageParam: 0 }),
    staleTime: 1000 * 60,
  });
}

export function useInfiniteThoughts() {
  return useInfiniteQuery({
    queryKey: ['thoughts', 'infinite'],
    queryFn: ({ pageParam = 0 }) => fetchThoughts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGINATION_SIZE) return undefined;
      return allPages.length * PAGINATION_SIZE;
    },
  });
}

async function toggleLike(thoughtId: string, userId: string) {
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('thought_id', thoughtId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    await supabase.from('likes').delete().eq('id', existingLike.id);
    await supabase.rpc('decrement_like', { thought_id: thoughtId });
  } else {
    await supabase.from('likes').insert({
      thought_id: thoughtId,
      user_id: userId,
    });
    await supabase.rpc('increment_like', { thought_id: thoughtId });
  }
}

export function useLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ thoughtId, userId }: { thoughtId: string; userId: string }) =>
      toggleLike(thoughtId, userId),
    onMutate: async ({ thoughtId }) => {
      await queryClient.cancelQueries({ queryKey: ['thoughts'] });
      const previousThoughts = queryClient.getQueryData<Thought[]>(['thoughts']);

      queryClient.setQueryData<Thought[]>(['thoughts'], (old) => {
        if (!old) return old;
        return old.map((thought) => {
          if (thought.id === thoughtId) {
            return {
              ...thought,
              has_liked: !thought.has_liked,
              likes_count: thought.has_liked
                ? thought.likes_count - 1
                : thought.likes_count + 1,
            };
          }
          return thought;
        });
      });

      return { previousThoughts };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousThoughts) {
        queryClient.setQueryData(['thoughts'], context.previousThoughts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['thoughts'] });
    },
  });
}
