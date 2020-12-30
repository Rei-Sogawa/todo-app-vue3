<template>
  <form @submit.prevent="handleSubmitEditedTodo(todoBeingEdited)">
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
import { defineComponent, PropType, Ref, ref, onMounted } from "vue";
import type Todo from "@/models/todo";

export type HandleCancelEdit = () => void;
export type HandleSubmitEditedTodo = (editedTodo: Todo) => void;

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
    handleSubmitEditedTodo: {
      type: Function as PropType<HandleSubmitEditedTodo>,
      required: true,
    },
    handleCancelEdit: {
      type: Function as PropType<HandleCancelEdit>,
      required: true,
    },
  },

  setup(props) {
    const todoBeingEdited: Todo = { ...props.todo };
    const input: Ref<HTMLInputElement | null> = ref(null);
    onMounted(() => {
      input.value?.focus();
    });
    return { todoBeingEdited, input };
  },
});
</script>
