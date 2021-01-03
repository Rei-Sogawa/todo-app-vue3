<template>
  <div class="container" style="width: 480px">
    <CreateTodoForm
      class="my-3"
      v-model:new-todo-title="state.newTodoTitle"
      :handle-submit-new-todo="handleSubmitNewTodo"
    />
    <TodoList
      :todos="todos"
      :handle-toggle-completed="handleToggleCompleted"
      :handle-click-remove="handleClickRemove"
      :handle-submit-edited-todo="handleSubmitEditedTodo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import useTodos from "@/composables/use-todos";

import type { HandleSubmitNewTodo } from "@/components/CreateTodoForm.vue";
import type { HandleSubmitEditedTodo } from "@/components/TodoList.vue";
import type {
  HandleToggleCompleted,
  HandleClickRemove,
} from "@/components/TodoItem.vue";

type State = {
  newTodoTitle: string;
};

export default defineComponent({
  components: { CreateTodoForm, TodoList },

  setup() {
    const state = reactive<State>({
      newTodoTitle: "",
    });

    const { todos, createTodo, updateTodo, removeTodo } = useTodos();

    const handleSubmitNewTodo: HandleSubmitNewTodo = () => {
      createTodo({ title: state.newTodoTitle, completed: false });
      state.newTodoTitle = "";
    };
    const handleToggleCompleted: HandleToggleCompleted = (todo) => {
      const { id, title, completed } = todo;
      updateTodo({ id, title, completed: !completed });
    };
    const handleClickRemove: HandleClickRemove = (todo) => {
      const { id } = todo;
      removeTodo({ id });
    };
    const handleSubmitEditedTodo: HandleSubmitEditedTodo = (editedTodo) => {
      const { id, title, completed } = editedTodo;
      updateTodo({ id, title, completed });
    };

    return {
      state,
      todos,
      handleSubmitNewTodo,
      handleToggleCompleted,
      handleClickRemove,
      handleSubmitEditedTodo,
    };
  },
});
</script>
