<template>
  <li class="list-group-item cleafix">
    <input
      type="checkbox"
      class="mr-3"
      required
      :checked="todo.completed"
      @change="onToggleChecked"
    />
    <span>{{ todo.title }}</span>
    <span class="float-right">
      <button
        class="btn px-1 mr-1 position-relative"
        style="bottom: 7px;"
        @click="onClickEdit"
      >
        <fa icon="edit" class="edit-icon"></fa>
      </button>
      <button
        class="btn px-1 position-relative"
        style="bottom: 7px;"
        @click="onClickRemove"
      >
        <fa icon="trash" class="trash-icon"></fa>
      </button>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/models/todo";
import { FontAwesomeIcon } from "@/plugins/font-awesome";

export default defineComponent({
  components: { fa: FontAwesomeIcon },

  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    },
    updateTodo: {
      type: Function as PropType<({ todo }: { todo: Todo }) => void>,
      required: true
    },
    removeTodo: {
      type: Function as PropType<({ todo }: { todo: Todo }) => void>,
      required: true
    },
    setTodoIdBeingEdited: {
      type: Function as PropType<(value: string | null) => void>,
      required: true
    }
  },

  setup(props) {
    const onToggleChecked = () => {
      const editedTodo = { ...props.todo, completed: !props.todo.completed };
      props.updateTodo({ todo: editedTodo });
    };
    const onClickEdit = () => {
      props.setTodoIdBeingEdited(props.todo.id);
    };
    const onClickRemove = () => {
      props.removeTodo({ todo: props.todo });
    };

    return {
      onToggleChecked,
      onClickEdit,
      onClickRemove
    };
  }
});
</script>

<style scoped>
.edit-icon {
  width: 15px;
  height: 15px;
}

.trash-icon {
  width: 15px;
  height: 15px;
}
</style>
