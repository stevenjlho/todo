import { create } from "zustand";
import { Todo } from "@prisma/client";
import { apiFetchTodos, } from "@/lib/request";

type initialState = {
  pageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
  todos: Todo[];
  todoValue: string;
  todoType: number;
  fetchTodo: () => void;
  changeTodoType: (todo: number) => void;
  subTodoValue: string;
  addTodo: (todo: Todo) => void;
  setTodoList: (todo: Todo[]) => void;
  deleteTodo: (id: string) => void;
};

const useTodoStore = create<initialState>((set, get) => ({
  pageLoading: false,
  todos: [],
  todoValue: "",
  subTodoValue: "",
  todoType: 1,
  changeTodoType: (type) =>
    set((state) => ({
      todoType: type,
    })),
  setPageLoading: (loading: boolean) =>
    set((state) => ({ ...state, pageLoading: loading })),
  fetchTodo: async () => {
    try {
      const page = 1;
      const limit = 10;
      await get().setPageLoading(true);
      const { data } = await apiFetchTodos(page, limit);
      get().setTodoList(data?.todos ?? []);
    } catch (error) {
      console.error(error);
    }
    get().setPageLoading(false);
    // const response = await fetch();
    // set({ fishies: await response.json() });
  },
  addTodo: (todo) =>
    set((state) => ({
      ...state,
      todos: [todo, ...state.todos],
    })),
  setTodoList: (todos) => set((state) => ({ ...state, todos })),
  updateTodo: (id: string) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  deleteTodo: (id: string) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;
