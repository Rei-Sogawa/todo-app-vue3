<template>
  <form @submit.prevent="onSubmit">
    <input
      ref="input"
      type="text"
      class="form-control px-5 py-4"
      v-model="todoBeingEdited.title"
      @blur="$emit('complete-edit-todo')"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import Todo from "@/models/todo";
import { TodosStore } from "@/composables/use-todos-store";
import TodosStoreKey from "@/composables/use-todos-store-key";

export default defineComponent({
  name: "EditTodoForm",

  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  setup() {
    const { updateTodo } = inject(TodosStoreKey) as TodosStore;
    return { updateTodo };
  },

  data(): { todoBeingEdited: Todo } {
    return {
      todoBeingEdited: { ...this.todo }
    };
  },

  mounted() {
    (this.$refs.input as HTMLElement).focus();
  },

  methods: {
    onSubmit() {
      this.updateTodo({
        id: this.todo.id,
        completed: this.todo.completed,
        title: this.todoBeingEdited.title
      });
      this.$emit("complete-edit-todo");
    }
  }
});
</script>
