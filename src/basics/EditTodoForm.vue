<template>
  <form @submit.prevent="onSubmit">
    <input
      ref="input"
      type="text"
      class="form-control px-5 py-4"
      v-model.trim="todoBeingEdited.title"
      @blur="onBlur"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from "vue";
import Todo from "@/models/todo";

export default defineComponent({
  name: "EditTodoForm",

  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  setup(props, context) {
    const todoBeingEdited: Todo = Object.assign({}, props.todo);

    const onSubmit = () => {
      if (!todoBeingEdited.title) {
        return;
      }
      context.emit("complete-edit", { editedTodo: todoBeingEdited });
    };
    const onBlur = (): void => {
      context.emit("cancel-edit");
    };

    const input: Ref<HTMLElement | null> = ref(null);
    onMounted(() => {
      (input.value as HTMLElement).focus();
    });

    return { todoBeingEdited, onSubmit, onBlur, input };
  }
});
</script>
