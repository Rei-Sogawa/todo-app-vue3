import Todo from "@/models/todo";
import { ref, Ref } from "vue";
import * as TodosService from "@/storage/todos-service";

type Todos = Ref<ReadonlyArray<Todo>>;
type CreateTodo = ({
  title,
  completed
}: Pick<Todo, "title" | "completed">) => void;
type UpdateTodo = ({
  id,
  title,
  completed
}: Pick<Todo, "id" | "title" | "completed">) => void;
type RemoveTodo = ({ id }: Pick<Todo, "id">) => void;

export type UseTodosReturn = {
  todos: Todos;
  createTodo: CreateTodo;
  updateTodo: UpdateTodo;
  removeTodo: RemoveTodo;
};

export default function useTodos(): UseTodosReturn {
  const todos: Todos = ref([]);

  const fetchTodos: () => void = () => {
    todos.value = TodosService.getTodos();
  };
  const createTodo: CreateTodo = ({ title, completed }) => {
    TodosService.postTodo({ title, completed });
    fetchTodos();
  };
  const updateTodo: UpdateTodo = ({ id, title, completed }) => {
    TodosService.putTodo({ id, title, completed });
    fetchTodos();
  };
  const removeTodo: RemoveTodo = ({ id }) => {
    TodosService.deleteTodo({ id });
    fetchTodos();
  };

  fetchTodos();
  return { todos, createTodo, updateTodo, removeTodo };
}
