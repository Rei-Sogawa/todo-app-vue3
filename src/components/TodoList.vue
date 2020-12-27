<template>
  <ul class="list-group">
    <div v-for="todo in todos" :key="todo.id" class="mb-1">
      <TodoItem
        v-if="!isTodoBeingEdited(todo)"
        :todo="todo"
        :update-todo="updateTodo"
        :remove-todo="removeTodo"
        :set-todo-id-being-edited="setTodoIdBeingEdited"
      />
      <EditTodoForm
        v-else
        :todo="todo"
        :update-todo="updateTodo"
        :set-todo-id-being-edited="setTodoIdBeingEdited"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import Todo from "@/models/todo";
import TodoItem from "@/components/TodoItem.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";

export default defineComponent({
  components: { TodoItem, EditTodoForm },

  props: {
    todos: { type: Array as PropType<Todo[]>, required: true },
    updateTodo: {
      type: Function as PropType<({ todo }: { todo: Todo }) => void>,
      required: true
    },
    removeTodo: {
      type: Function as PropType<({ todo }: { todo: Todo }) => void>,
      required: true
    }
  },

  setup() {
    const todoIdBeingEdited: Ref<string | null> = ref(null);
    const isTodoBeingEdited = (todo: Todo) =>
      todo.id === todoIdBeingEdited.value;
    const setTodoIdBeingEdited = (value: string | null) => {
      todoIdBeingEdited.value = value;
    };

    return {
      todoIdBeingEdited,
      isTodoBeingEdited,
      setTodoIdBeingEdited
    };
  }
});
</script>
