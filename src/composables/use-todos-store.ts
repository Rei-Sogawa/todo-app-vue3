import Todo from "@/models/todo";
import { reactive } from "vue";
import * as TodosService from "@/storage/todos-service";

export default function useTodosStore() {
  const state = reactive<{ todos: Todo[] }>({ todos: [] });

  const fetchTodos = () => {
    state.todos = TodosService.getTodos();
  };

  const createTodo = ({
    title,
    completed
  }: {
    title: string;
    completed: boolean;
  }) => {
    TodosService.postTodo({ title, completed });
    fetchTodos();
  };

  const updateTodo = ({
    id,
    title,
    completed
  }: {
    id: string;
    title: string;
    completed: boolean;
  }) => {
    TodosService.putTodo({ id, title, completed });
    fetchTodos();
  };

  const removeTodo = ({ id }: { id: string }) => {
    TodosService.deleteTodo({ id });
    fetchTodos();
  };

  return { state, fetchTodos, createTodo, updateTodo, removeTodo };
}

export type TodosStore = ReturnType<typeof useTodosStore>;
