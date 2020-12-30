<template>
  <form @submit.prevent="handleSubmitEditedTodo(todoBeingEdited)">
    <input
      type="text"
      class="form-control px-5 py-4"
      v-model.trim="todoBeingEdited.title"
      @blur="handleCancelEdit"
      required
      autofocus
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type Todo from "@/models/todo";
import type {
  HandleCancelEdit,
  HandleSubmitEditedTodo,
} from "@/pages/Index.vue";

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
    return { todoBeingEdited };
  },
});
</script>
