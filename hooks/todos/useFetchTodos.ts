import { z } from "zod";

const AgifyResponse = z.object({
    userID: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
});

type AgifyResponse = z.infer<typeof AgifyResponse>;

export const useFetchTodos = async (id: number) => {
    console.log(`Start fetching ${id}`)
    await new Promise(r => setTimeout(r, 1000));

    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => res.json()).then(AgifyResponse.parse);
}