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

export default defineComponent({
  components: { TodoItem, EditTodoForm },

  props: {
    todos: {
      type: Array as PropType<ReadonlyArray<Todo>>,
      required: true
    },
    todoIdBeingEdited: {
      // nullable のため required は false
      type: String as PropType<string | null>,
      required: false
    },
    // 以下の props は子に渡すだけなので、PropType をわざわざ書く必要はない？
    handleToggleCompleted: {
      type: Function,
      required: true
    },
    handleClickEdit: {
      type: Function,
      required: true
    },
    handleClickRemove: {
      type: Function,
      required: true
    },
    handleSubmitEditedTodo: {
      type: Function,
      required: true
    },
    handleCancelEdit: {
      type: Function,
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
