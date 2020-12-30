<template>
  <form @submit.prevent="handleSubmitNewTodo">
    <input
      type="text"
      placeholder="Add new todo"
      required
      class="form-control px-5 py-4"
      :value="newTodoTitle"
      @input="$emit('update:newTodoTitle', $event.target.value)"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { HandleSubmitNewTodo } from "@/pages/Index.vue";

export default defineComponent({
  props: {
    newTodoTitle: {
      type: String,
      required: true,
    },
    handleSubmitNewTodo: {
      type: Function as PropType<HandleSubmitNewTodo>,
      required: true,
    },
  },

  emits: ["update:newTodoTitle"],
});
</script>
