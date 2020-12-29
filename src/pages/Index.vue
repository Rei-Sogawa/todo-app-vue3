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
import { defineComponent } from "vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import useTodos from "@/composables/use-todos";

export default defineComponent({
  components: { CreateTodoForm, TodoList },

  setup() {
    const { todos, createTodo, updateTodo, removeTodo } = useTodos();
    return { todos, createTodo, updateTodo, removeTodo };
  }
});
</script>
