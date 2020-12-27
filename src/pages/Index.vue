<template>
  <div class="container" style="width: 480px;">
    <CreateTodoForm class="my-3" @submit-new-todo="onSubmitNewTodo" />
    <TodoList
      :todos="todos"
      @complete-edit="onCompleteEdit"
      @click-remove="onClickRemove"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onBeforeMount } from "vue";
import CreateTodoForm from "@/basics/CreateTodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import Todo from "@/models/todo";
import * as TodosService from "@/storage/todos-service";

export default defineComponent({
  name: "Index",

  components: { CreateTodoForm, TodoList },

  setup() {
    const todos: Ref<ReadonlyArray<Todo>> = ref([]);

    const onSubmitNewTodo = ({ title }: { title: string }): void => {
      TodosService.postTodo({ title, completed: false });
      todos.value = TodosService.getTodos();
    };

    const onCompleteEdit = ({ editedTodo }: { editedTodo: Todo }) => {
      const { id, title, completed } = editedTodo;
      TodosService.putTodo({ id, title, completed });
      todos.value = TodosService.getTodos();
    };
    const onClickRemove = ({ todo }: { todo: Todo }) => {
      TodosService.deleteTodo({ id: todo.id });
      todos.value = TodosService.getTodos();
    };

    onBeforeMount(() => {
      todos.value = TodosService.getTodos();
    });

    return { todos, onSubmitNewTodo, onCompleteEdit, onClickRemove };
  }
});
</script>
