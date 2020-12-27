<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      class="form-control px-5 py-4"
      placeholder="Add new todo"
      v-model.trim="newTodoTitle"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { TodosStore } from "@/composables/use-todos-store";
import TodosStoreKey from "@/composables/use-todos-store-key";

export default defineComponent({
  name: "NewTodoForm",

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
