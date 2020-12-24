<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      class="form-control"
      placeholder="Add New Todo"
      v-model.trim="newTodoTitle"
    />
  </form>
  <i class="bi bi-arrows-angle-expand"></i>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { TodosStore } from "@/composables/use-todos-store";
import TodosStoreKey from "@/composables/use-todos-store-key";

export default defineComponent({
  name: "TodoNewForm",
  setup() {
    const { createTodo } = inject(TodosStoreKey) as TodosStore;
    return { createTodo };
  },
  data(): { newTodoTitle: string } {
    return {
      newTodoTitle: ""
    };
  },
  methods: {
    onSubmit() {
      if (!this.newTodoTitle) {
        return;
      }
      this.createTodo({ title: this.newTodoTitle, completed: false });
      this.newTodoTitle = "";
    }
  }
});
</script>
