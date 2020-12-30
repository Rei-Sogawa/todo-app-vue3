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
        :handle-submit-edited-todo="handleSubmitEditedTodo"
        :handle-cancel-edit="handleCancelEdit"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/models/todo";
import TodoItem from "@/components/TodoItem.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";

import type {
  HandleToggleCompleted,
  HandleClickEdit,
  HandleClickRemove,
} from "@/components/TodoItem.vue";
import type {
  HandleCancelEdit,
  HandleSubmitEditedTodo,
} from "@/components/EditTodoForm.vue";

export default defineComponent({
  components: { TodoItem, EditTodoForm },

  props: {
    todos: {
      type: Array as PropType<ReadonlyArray<Todo>>,
      required: true
    },
    todoIdBeingEdited: {
      type: String as PropType<string | null>,
      default: undefined
    },
    handleToggleCompleted: {
      type: Function as PropType<HandleToggleCompleted>,
      required: true
    },
    handleClickEdit: {
      type: Function as PropType<HandleClickEdit>,
      required: true
    },
    handleClickRemove: {
      type: Function as PropType<HandleClickRemove>,
      required: true
    },
    handleSubmitEditedTodo: {
      type: Function as PropType<HandleSubmitEditedTodo>,
      required: true
    },
    handleCancelEdit: {
      type: Function as PropType<HandleCancelEdit>,
      required: true
    }
  },

  setup(props) {
    const isTodoBeingEdited = (todo: Todo) =>
      todo.id === props.todoIdBeingEdited;
    return { isTodoBeingEdited };
  }
});
</script>
