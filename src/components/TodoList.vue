<template>
  <ul class="list-group">
    <div v-for="todo in todos" :key="todo.id" class="mb-1">
      <TodoItem
        v-if="!isTodoBeingEdited(todo)"
        :todo="todo"
        :handle-toggle-completed="handleToggleCompleted"
        :handle-click-edit="handleClickEdit"
        :handle-click-remove="handleClickRemove"
      />
      <EditTodoForm
        v-else
        :todo="todo"
        :handle-submit-edited-todo-and-reset="handleSubmitEditedTodoAndReset"
        :handle-cancel-edit="handleCancelEdit"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import Todo from "@/models/todo";
import TodoItem from "@/components/TodoItem.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";

import type {
  HandleToggleCompleted,
  HandleClickEdit,
  HandleClickRemove,
} from "@/components/TodoItem.vue";
import type {
  HandleSubmitEditedTodoAndReset,
  HandleCancelEdit,
} from "@/components/EditTodoForm.vue";

export type HandleSubmitEditedTodo = (editedTodo: Todo) => void;
export type { HandleToggleCompleted, HandleClickRemove }

type State = {
  todoIdBeingEdited?: string;
};

export default defineComponent({
  components: { TodoItem, EditTodoForm },

  props: {
    todos: {
      type: Array as PropType<ReadonlyArray<Todo>>,
      required: true,
    },
    handleToggleCompleted: {
      type: Function as PropType<HandleToggleCompleted>,
      required: true,
    },
    handleClickRemove: {
      type: Function as PropType<HandleClickRemove>,
      required: true,
    },
    handleSubmitEditedTodo: {
      type: Function as PropType<HandleSubmitEditedTodo>,
      required: true,
    },
  },

  setup(props) {
    const state = reactive<State>({
      todoIdBeingEdited: undefined,
    });
    const isTodoBeingEdited = (todo: Todo) =>
      todo.id === state.todoIdBeingEdited;

    const handleSubmitEditedTodoAndReset: HandleSubmitEditedTodoAndReset = (
      editedTodo
    ) => {
      props.handleSubmitEditedTodo(editedTodo);
      state.todoIdBeingEdited = undefined;
    };
    const handleClickEdit: HandleClickEdit = (todoId) => {
      state.todoIdBeingEdited = todoId;
    };
    const handleCancelEdit: HandleCancelEdit = () => {
      state.todoIdBeingEdited = undefined;
    };

    return {
      state,
      isTodoBeingEdited,
      handleSubmitEditedTodoAndReset,
      handleClickEdit,
      handleCancelEdit,
    };
  },
});
</script>
