<template>
  <ul class="list-group">
    <div v-for="todo in todos" :key="todo.id" class="mb-1">
      <TodoItem
        v-if="!isTodoBeingEdited(todo)"
        :todo="todo"
        @toggle-completed="onToggleCompleted"
        @click-edit="onClickEdit"
        @click-remove="onClickRemove"
      />
      <EditTodoForm
        v-else
        :todo="todo"
        @complete-edit="onCompleteEdit"
        @cancel-edit="onCancelEdit"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import Todo from "@/models/todo";
import TodoItem from "@/basics/TodoItem.vue";
import EditTodoForm from "@/basics/EditTodoForm.vue";

export default defineComponent({
  name: "TodoList",

  components: { TodoItem, EditTodoForm },

  props: {
    todos: { type: Array as PropType<Todo[]>, default: [] }
  },

  setup(_, context) {
    const todoIdBeingEdited: Ref<string | null> = ref(null);
    const isTodoBeingEdited = (todo: Todo) =>
      todo.id === todoIdBeingEdited.value;

    const onToggleCompleted = ({ todo }: { todo: Todo }) => {
      context.emit("complete-edit", { editedTodo: todo });
    };
    const onClickEdit = ({ todo }: { todo: Todo }) => {
      todoIdBeingEdited.value = todo.id;
    };
    const onClickRemove = ({ todo }: { todo: Todo }) => {
      context.emit("click-remove", { todo });
    };

    const onCompleteEdit = ({ editedTodo }: { editedTodo: Todo }) => {
      context.emit("complete-edit", { editedTodo });
      todoIdBeingEdited.value = null;
    };
    const onCancelEdit = () => {
      todoIdBeingEdited.value = null;
    };

    return {
      todoIdBeingEdited,
      isTodoBeingEdited,
      onToggleCompleted,
      onClickEdit,
      onClickRemove,
      onCompleteEdit,
      onCancelEdit
    };
  }
});
</script>
