import {useQuery} from "@tanstack/react-query";
import {useFetchTodos} from "@/components/hooks/todos/useFetchTodos";

const todoKeys = {
    all: ['todos'] as const,
    lists: () => [...todoKeys.all, 'list'] as const,
    list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
    details: () => [...todoKeys.all, 'detail'] as const,
    detail: (id: number) => [...todoKeys.details(), id] as const,
}

export const useTodos = (id: number) => useQuery({
    queryKey: todoKeys.detail(id), // regarde comment j'utilise "name" comme clé ici !
    queryFn: () => useFetchTodos(id)
})