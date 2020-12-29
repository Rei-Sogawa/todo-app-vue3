import Todo from "@/models/todo";
import { ref, Ref } from "vue";
import * as TodosService from "@/storage/todos-service";

export default function useTodos() {
  const todos: Ref<ReadonlyArray<Todo>> = ref([]);
  const getTodos = () => TodosService.getTodos();
  const fetchTodos = () => {
    todos.value = getTodos();
  };
  const createTodo = ({
    title,
    completed
  }: Pick<Todo, "title" | "completed">) => {
    TodosService.postTodo({ title, completed });
  };
  const updateTodo = ({
    id,
    title,
    completed
  }: Pick<Todo, "id" | "title" | "completed">) => {
    TodosService.putTodo({ id, title, completed });
  };
  const removeTodo = ({ id }: Pick<Todo, "id">) => {
    TodosService.deleteTodo({ id });
  };

  return { todos, getTodos, fetchTodos, createTodo, updateTodo, removeTodo };
}

export type UseTodos = typeof useTodos;
