import { Todo } from "@prisma/client";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

export type TodoListResponse<T extends any> = {
  status: string;
  results: number;
  data: T;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson
      ? data.message || response.statusText
      : response.statusText;
    throw new Error(message);
  }

  return data as T;
}

export async function apiFetchTodos(
  page: number,
  limit: number
): Promise<TodoListResponse<{todos: Todo[]}>> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/todos?page=${page}&limit=${limit}`
  );

  return handleResponse<TodoListResponse<{todos: Todo[]}>>(response).then(
    (data) => data
  );
}

export async function apiCreateTodos(
  todoData: Pick<Todo, 'title' | 'completed'> 
): Promise<TodoListResponse<{todo: Todo}>> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  return handleResponse<TodoListResponse<{todo: Todo}>>(response).then(
    (data) => data
  );
}

export async function apiUpdateTodos(
  id: number, 
  todoData: Partial<Todo> 
): Promise<TodoListResponse<{todo: Todo}>> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  return handleResponse<TodoListResponse<{todo: Todo}>>(response).then(
    (data) => data
  );
}

export async function apiDeleteTodos(
  id: number 
): Promise<TodoListResponse<unknown>> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${id}`, {
    method: "DELETE",
  });

  return handleResponse<TodoListResponse<unknown>>(response).then(
    (data) => data
  );
}