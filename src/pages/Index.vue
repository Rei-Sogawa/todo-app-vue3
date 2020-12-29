<template>
  <div class="container" style="width: 480px;">
    <CreateTodoForm
      class="my-3"
      :handle-submit-new-todo="handleSubmitNewTodo"
    />
    <TodoList
      :todos="todos"
      :fetch-todos="fetchTodos"
      :update-todo="updateTodo"
      :remove-todo="removeTodo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import CreateTodoForm, {
  HandleSubmitNewTodo
} from "@/components/CreateTodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import useTodos from "@/composables/use-todos";

export default defineComponent({
  components: { CreateTodoForm, TodoList },

  setup() {
    const {
      todos,
      fetchTodos,
      createTodo,
      updateTodo,
      removeTodo
    } = useTodos();

    const handleSubmitNewTodo: HandleSubmitNewTodo = ({ title }) => {
      createTodo({ title, completed: false });
      fetchTodos();
    };

    onBeforeMount(() => {
      fetchTodos();
    });

    return { todos, handleSubmitNewTodo, fetchTodos, updateTodo, removeTodo };
  }
});
</script>
