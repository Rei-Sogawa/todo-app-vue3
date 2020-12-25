<template>
  <div class="h-100 mx-auto" style="width: 480px;">
    <h1 class="text-center">Todo App</h1>
    <NewTodoForm />
    <br />

    <ul class="list-group">
      <div v-for="todo in todos" :key="todo.id" class="mb-1">
        <TodoItem
          v-if="!isTodoBeingEdited(todo)"
          :todo="todo"
          @click-edit-todo="onClickEditTodo"
        ></TodoItem>
        <EditTodoForm
          v-else
          :todo="todo"
          @complete-edit-todo="todoIdBeingEdited = null"
        ></EditTodoForm>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import Todo from "@/models/todo";
import useTodosStore from "@/composables/use-todos-store";
import TodosStoreKey from "@/composables/use-todos-store-key";
import NewTodoForm from "@/components/NewTodoForm.vue";
import TodoItem from "@/components/TodoItem.vue";
import EditTodoForm from "@/components/EditTodoFrom.vue";

export default defineComponent({
  name: "Home",

  setup() {
    const todosStore = useTodosStore();
    provide(TodosStoreKey, todosStore);
    todosStore.fetchTodos();
    return { state: todosStore.state };
  },

  components: { NewTodoForm, TodoItem, EditTodoForm },

  data(): { todoIdBeingEdited: string | null } {
    return {
      todoIdBeingEdited: null
    };
  },

  computed: {
    todos(): Todo[] {
      return this.state.todos;
    }
  },

  methods: {
    onClickEditTodo(todo: Todo): void {
      this.todoIdBeingEdited = todo.id;
    },

    isTodoBeingEdited(todo: Todo): boolean {
      return (
        Boolean(this.todoIdBeingEdited) && this.todoIdBeingEdited === todo.id
      );
    }
  }
});
</script>
