<template>
  <form @submit.prevent="handleSubmitNewTodo">
    <input
      type="text"
      placeholder="Add new todo"
      required
      class="form-control px-5 py-4"
      v-model.trim="state.title"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";

export type HandleSubmitNewTodo = () => void;

type State = {
  title: string;
};

export default defineComponent({
  props: {
    newTodoTitle: {
      type: String as PropType<string>,
      required: true
    },
    handleSubmitNewTodo: {
      type: Function as PropType<HandleSubmitNewTodo>,
      required: true
    }
  },

  emits: ["update:newTodoTitle"],

  setup(props, context) {
    const state = reactive<State>({ title: props.newTodoTitle });
    watch(
      () => props.newTodoTitle,
      newValue => {
        state.title = newValue;
      }
    );
    watch(
      () => state.title,
      newValue => {
        context.emit("update:newTodoTitle", newValue);
      }
    );
    return { state };
  }
});
</script>
