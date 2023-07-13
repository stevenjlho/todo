import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
}

type initialState = {
  page_loading: boolean;
  setPageLoading: (loading: boolean) => void;
  todos: Todo[];
  todoValue: string;
  changeTodoValue: (todo: string) => void
  subTodoValue: string;
  addTodo: (todo: Todo) => void;
  setTodoList: (todo: Todo[]) => void;
  deleteTodo: (id: string) => void;
};

const useTodoStore = create<initialState>((set) => ({
  page_loading: false,
  todos: [{ id: "1", title: "first data" }],
  todoValue: "",
  subTodoValue: "",
  setPageLoading: (loading: boolean) =>
    set((state) => ({ ...state, page_loading: loading })),
  changeTodoValue: (todo) =>
    set((state) => ({
      todoValue: todo,
    })),
  addTodo: (todo) =>
    set((state) => ({
      ...state,
      todos: [todo, ...state.todos],
    })),
  setTodoList: (todos) => set((state) => ({ ...state, todos })),
  deleteTodo: (id: string) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id != id),
    })),
}));

export default useTodoStore;
