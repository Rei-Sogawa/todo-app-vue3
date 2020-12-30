<template>
  <form @submit.prevent="onSubmit">
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
import { defineComponent, PropType, Ref, ref } from "vue";

export type HandleSubmitNewTodo = (title: Ref<string>) => void;

export default defineComponent({
  props: {
    handleSubmitNewTodo: {
      type: Function as PropType<HandleSubmitNewTodo>,
      required: true
    }
  },

  setup(props) {
    const title: Ref<string> = ref("");
    const onSubmit = () => {
      props.handleSubmitNewTodo(title);
    };
    return { title, onSubmit };
  }
});
</script>
