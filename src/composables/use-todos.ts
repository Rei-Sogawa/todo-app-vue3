import Todo from "@/models/todo";
import { ref, Ref } from "vue";
import * as TodosService from "@/storage/todos-service";

export type UseTodosReturn = {
  todos: Ref<ReadonlyArray<Todo>>;
  createTodo: ({ title, completed }: Pick<Todo, "title" | "completed">) => void;
  updateTodo: ({
    id,
    title,
    completed
  }: Pick<Todo, "id" | "title" | "completed">) => void;
  removeTodo: ({ id }: Pick<Todo, "id">) => void;
};

export default function useTodos(): UseTodosReturn {
  const todos: UseTodosReturn["todos"] = ref([]);

  const fetchTodos: () => void = () => {
    todos.value = TodosService.getTodos();
  };
  const createTodo: UseTodosReturn["createTodo"] = ({ title, completed }) => {
    TodosService.postTodo({ title, completed });
    fetchTodos();
  };
  const updateTodo: UseTodosReturn["updateTodo"] = ({
    id,
    title,
    completed
  }) => {
    TodosService.putTodo({ id, title, completed });
    fetchTodos();
  };
  const removeTodo: UseTodosReturn["removeTodo"] = ({ id }) => {
    TodosService.deleteTodo({ id });
    fetchTodos();
  };

  fetchTodos();
  return { todos, createTodo, updateTodo, removeTodo };
}
