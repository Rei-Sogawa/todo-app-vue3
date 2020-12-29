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
import Todo from "@/models/todo";

export type HandleSubmitNewTodo = ({ title }: Pick<Todo, "title">) => void;

export default defineComponent({
  props: {
    handleSubmitNewTodo: {
      type: Function as PropType<HandleSubmitNewTodo>,
      required: true
    }
  },

  setup(props) {
    const newTodoTitle: Ref<string> = ref("");
    const onSubmit = (): void => {
      props.handleSubmitNewTodo({ title: newTodoTitle.value });
      newTodoTitle.value = "";
    };
    return { newTodoTitle, onSubmit };
  }
});
</script>
