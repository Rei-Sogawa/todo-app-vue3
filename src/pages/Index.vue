<template>
  <div class="container" style="width: 480px">
    <CreateTodoForm
      class="my-3"
      :handle-submit-new-todo="handleSubmitNewTodo"
    />
    <TodoList
      :todos="todos"
      :todo-id-being-edited="todoIdBeingEdited"
      :handle-toggle-completed="handleToggleCompleted"
      :handle-click-edit="handleClickEdit"
      :handle-click-remove="handleClickRemove"
      :handle-submit-edited-todo="handleSubmitEditedTodo"
      :handle-cancel-edit="handleCancelEdit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import CreateTodoForm from "@/components/CreateTodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import useTodos from "@/composables/use-todos";
import Todo from "@/models/todo";

import { HandleSubmitNewTodo } from "@/components/CreateTodoForm.vue";

export type HandleToggleCompleted = (todo: Todo) => void;
export type HandleClickEdit = (todo: Todo) => void;
export type HandleClickRemove = (todo: Todo) => void;
export type HandleCancelEdit = () => void;
export type HandleSubmitEditedTodo = (editedTodo: Todo) => void;

export default defineComponent({
  components: { CreateTodoForm, TodoList },

  setup() {
    const { todos, createTodo, updateTodo, removeTodo } = useTodos();

    const handleSubmitNewTodo: HandleSubmitNewTodo = title => {
      createTodo({ title: title.value, completed: false });
      title.value = "";
    };

    const todoIdBeingEdited: Ref<string | null> = ref(null);
    const handleToggleCompleted: HandleToggleCompleted = todo => {
      const { id, title, completed } = todo;
      updateTodo({ id, title, completed: !completed });
    };
    const handleClickEdit: HandleClickEdit = todo => {
      todoIdBeingEdited.value = todo.id;
    };
    const handleClickRemove: HandleClickRemove = todo => {
      const { id } = todo;
      removeTodo({ id });
    };
    const handleSubmitEditedTodo: HandleSubmitEditedTodo = editedTodo => {
      const { id, title, completed } = editedTodo;
      updateTodo({ id, title, completed });
      todoIdBeingEdited.value = null;
    };
    const handleCancelEdit: HandleCancelEdit = () => {
      todoIdBeingEdited.value = null;
    };

    return {
      handleSubmitNewTodo,

      todos,
      todoIdBeingEdited,
      handleToggleCompleted,
      handleClickEdit,
      handleClickRemove,
      handleSubmitEditedTodo,
      handleCancelEdit
    };
  }
});
</script>
