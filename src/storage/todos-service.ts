import Todo from "@/models/todo";
import { nanoid } from "nanoid";

const STORAGE_KEY = "todos";

const getTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  const todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
  return todos;
};

const postTodo = ({
  title,
  completed
}: {
  title: string;
  completed: boolean;
}) => {
  const newTodo: Todo = {
    id: nanoid(),
    title,
    completed,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  const todos = getTodos();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, newTodo]));
};

const putTodo = ({
  id,
  title,
  completed
}: {
  id: string;
  title: string;
  completed: boolean;
}) => {
  const todos: Todo[] = getTodos();
  const updatedTodo = {
    ...todos.find(todo => todo.id === id),
    title,
    completed,
    updatedAt: Date.now()
  };
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(todos.map(todo => (todo.id === id ? updatedTodo : todo)))
  );
};

const deleteTodo = ({ id }: { id: string }) => {
  const todos = getTodos();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(todos.filter(todo => todo.id !== id))
  );
};

export { getTodos, postTodo, putTodo, deleteTodo };
