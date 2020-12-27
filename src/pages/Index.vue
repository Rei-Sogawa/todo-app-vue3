<template>
  <div class="container" style="width: 480px;">
    <CreateTodoForm class="my-3" :create-todo="createTodo" />
    <TodoList
      :todos="todos"
      :update-todo="updateTodo"
      :remove-todo="removeTodo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onBeforeMount } from "vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import Todo from "@/models/todo";
import * as TodosService from "@/storage/todos-service";

export default defineComponent({
  components: { CreateTodoForm, TodoList },

  setup() {
    const todos: Ref<ReadonlyArray<Todo>> = ref([]);

    const fetchTodos = () => {
      todos.value = TodosService.getTodos();
    };
    const createTodo = ({ title }: Pick<Todo, "title">): void => {
      TodosService.postTodo({ title, completed: false });
      fetchTodos();
    };
    const updateTodo = ({ todo }: { todo: Todo }): void => {
      const { id, title, completed } = todo;
      TodosService.putTodo({ id, title, completed });
      fetchTodos();
    };
    const removeTodo = ({ todo }: { todo: Todo }): void => {
      TodosService.deleteTodo({ id: todo.id });
      fetchTodos();
    };

    onBeforeMount(() => {
      fetchTodos();
    });

    return { todos, createTodo, updateTodo, removeTodo };
  }
});
</script>
