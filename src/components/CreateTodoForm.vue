<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      class="form-control px-5 py-4"
      placeholder="Add new todo"
      v-model.trim="newTodoTitle"
      required
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from "vue";
import type { UseTodosReturn } from '@/composables/use-todos'

export default defineComponent({
  props: {
    createTodo: {
      type: Function as PropType<UseTodosReturn["createTodo"]>,
      required: true
    }
  },

  setup(props) {
    const newTodoTitle: Ref<string> = ref("");
    const onSubmit = (): void => {
      props.createTodo({title: newTodoTitle.value, completed: false});
      newTodoTitle.value = "";
    };
    return { newTodoTitle, onSubmit };
  }
});
</script>
