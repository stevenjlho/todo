import { create } from "zustand";
import { Todo } from "@prisma/client";


type initialState = {
  page_loading: boolean;
  setPageLoading: (loading: boolean) => void;
  todos: Todo[];
  todoValue: string;
  todoType: number,
  changeTodoType: (todo: number) => void
  subTodoValue: string;
  addTodo: (todo: Todo) => void;
  setTodoList: (todo: Todo[]) => void;
  deleteTodo: (id: string) => void;
};

const useTodoStore = create<initialState>((set) => ({
  page_loading: false,
  todos: [],
  todoValue: "",
  subTodoValue: "",
  todoType: 1,
  changeTodoType: (type) =>
    set((state) => ({
      todoType: type,
    })),
  setPageLoading: (loading: boolean) =>
    set((state) => ({ ...state, page_loading: loading })),
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
