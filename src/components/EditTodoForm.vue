<template>
  <form @submit.prevent="handleSubmitEditedTodoAndReset(todoBeingEdited)">
    <input
      ref="input"
      type="text"
      class="form-control px-5 py-4"
      v-model.trim="todoBeingEdited.title"
      @blur="handleCancelEdit"
      required
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import type Todo from "@/models/todo";

export type HandleCancelEdit = () => void;
export type HandleSubmitEditedTodoAndReset = (editedTodo: Todo) => void;

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
    handleSubmitEditedTodoAndReset: {
      type: Function as PropType<HandleSubmitEditedTodoAndReset>,
      required: true,
    },
    handleCancelEdit: {
      type: Function as PropType<HandleCancelEdit>,
      required: true,
    },
  },

  setup(props) {
    const todoBeingEdited: Todo = { ...props.todo };
    const input = ref<HTMLInputElement | null>(null);
    onMounted(() => {
      input.value?.focus();
    });
    return { todoBeingEdited, input };
  },
});
</script>
