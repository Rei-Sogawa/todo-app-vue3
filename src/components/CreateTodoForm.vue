<template>
  <form @submit.prevent="handleSubmitNewTodo">
    <input
      type="text"
      placeholder="Add new todo"
      required
      class="form-control px-5 py-4"
      v-model.trim="title"
    />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
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

  setup(props, context) {
    const title = computed({
      get: () => props.newTodoTitle,
      set: (newVal) => {
        context.emit("update:newTodoTitle", newVal);
      },
    });
    return { title };
  },
});
</script>
