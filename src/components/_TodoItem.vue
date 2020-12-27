<template>
  <li class="list-group-item clearfix">
    <input
      type="checkbox"
      class="mr-3"
      :checked="todo.completed"
      @change="onToggleChecked()"
    />
    <span>{{ todo.title }}</span>
    <span class="float-right">
      <button
        class="btn py-0 px-1 mr-1"
        @click="$emit('click-edit-todo', todo)"
      >
        <fa icon="edit" style="width: 15px; height: 15px;" class="my-0"></fa>
      </button>
      <button class="btn py-0 px-1" @click="removeTodo({ id: todo.id })">
        <fa icon="trash" style="width: 15px; height: 15px;" class="my-0"></fa>
      </button>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import Todo from "@/models/todo";
import { TodosStore } from "@/composables/use-todos-store";
import TodosStoreKey from "@/composables/use-todos-store-key";

export default defineComponent({
  name: "TodoItem",

  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  setup() {
    const { updateTodo, removeTodo } = inject(TodosStoreKey) as TodosStore;
    return { updateTodo, removeTodo };
  },

  methods: {
    onToggleChecked() {
      this.updateTodo({
        id: this.todo.id,
        title: this.todo.title,
        completed: !this.todo.completed
      });
    }
  }
});
</script>
