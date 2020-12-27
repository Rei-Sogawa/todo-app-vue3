<template>
  <form @submit.prevent="onSubmit">
    <input
      ref="input"
      type="text"
      class="form-control px-5 py-4"
      v-model.trim="todoBeingEdited.title"
      @blur="onBlur"
      required
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from "vue";
import Todo from "@/models/todo";

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    },
    updateTodo: {
      type: Function as PropType<({ todo }: { todo: Todo }) => void>,
      required: true
    },
    setTodoIdBeingEdited: {
      type: Function as PropType<(value: string | null) => void>,
      required: true
    }
  },

  setup(props) {
    const todoBeingEdited: Todo = { ...props.todo };

    const onSubmit = () => {
      props.updateTodo({ todo: todoBeingEdited });
      props.setTodoIdBeingEdited(null);
    };
    const onBlur = (): void => {
      props.setTodoIdBeingEdited(null);
    };

    const input: Ref<HTMLInputElement | null> = ref(null);
    onMounted(() => {
      input.value?.focus();
    });

    return { todoBeingEdited, onSubmit, onBlur, input };
  }
});
</script>
