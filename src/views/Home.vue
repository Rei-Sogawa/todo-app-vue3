<template>
  <div class="h-100 mx-auto" style="width: 480px;">
    <h1 class="text-center">Todo App</h1>
    <TodoNewForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import useTodosStore from "@/composables/use-todos-store";
import TodosStoreKey from "@/composables/use-todos-store-key";
import TodoNewForm from "@/components/TodoNewForm.vue";

export default defineComponent({
  name: "Home",
  setup() {
    const todosStore = useTodosStore();
    provide(TodosStoreKey, todosStore);
    todosStore.fetchTodos();
    return { todos: todosStore.state.todos };
  },
  components: { TodoNewForm },
  methods: {
    onSubmitNewTodo() {
      console.log("CALL");
    }
  }
});
</script>
