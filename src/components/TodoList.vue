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
import { defineComponent, PropType, Ref, ref } from "vue";
import Todo from "@/models/todo";
import TodoItem from "@/components/TodoItem.vue"
import type { HandleClickEdit, HandleClickRemove, HandleToggleCompleted } from "@/components/TodoItem.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";
import type { HandleCancelEdit, HandleSubmitEditedTodo } from "@/components/EditTodoForm.vue";
import type { UseTodosReturn } from "@/composables/use-todos";

export default defineComponent({
  components: { TodoItem, EditTodoForm },

  props: {
    todos: {
      type: Array as PropType<ReadonlyArray<Todo>>,
      required: true
    },
    updateTodo: {
      type: Function as PropType<UseTodosReturn["updateTodo"]>,
      required: true
    },
    removeTodo: {
      type: Function as PropType<UseTodosReturn["removeTodo"]>,
      required: true
    }
  },

  setup(props) {
    const todoIdBeingEdited: Ref<string | null> = ref(null);
    const isTodoBeingEdited = (todo: Todo) =>
      todo.id === todoIdBeingEdited.value;
    const setTodoIdBeingEdited = (value: string | null) => {
      todoIdBeingEdited.value = value;
    };

    const handleToggleCompleted: HandleToggleCompleted = todo => {
      const { id, title, completed } = todo;
      props.updateTodo({ id, title, completed: !completed });
    };
    const handleClickEdit: HandleClickEdit = todoId => {
      setTodoIdBeingEdited(todoId);
    };
    const handleClickRemove: HandleClickRemove = todo => {
      const { id } = todo;
      props.removeTodo({ id });
    };
    const handleSubmitEditedTodo: HandleSubmitEditedTodo = editedTodo => {
      const { id, title, completed } = editedTodo;
      props.updateTodo({ id, title, completed });
      setTodoIdBeingEdited(null);
    };
    const handleCancelEdit: HandleCancelEdit = () => {
      setTodoIdBeingEdited(null);
    };

    return {
      todoIdBeingEdited,
      isTodoBeingEdited,
      handleToggleCompleted,
      handleClickEdit,
      handleClickRemove,
      handleSubmitEditedTodo,
      handleCancelEdit
    };
  }
});
</script>
