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
import { defineComponent, ref, Ref } from "vue";

export default defineComponent({
  name: "CreateTodoForm",

  setup(_, context) {
    const newTodoTitle: Ref<string> = ref("");
    const onSubmit = (): void => {
      if (!newTodoTitle.value) {
        return;
      }
      context.emit("submit-new-todo", { title: newTodoTitle.value });
      newTodoTitle.value = "";
    };
    return { newTodoTitle, onSubmit };
  }
});
</script>
