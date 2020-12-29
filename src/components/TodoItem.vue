<template>
  <li class="list-group-item d-flex justify-content-between">
    <div>
      <input
        type="checkbox"
        class="mr-3"
        required
        :checked="todo.completed"
        @change="onToggleCompleted"
      />
      <span>{{ todo.title }}</span>
    </div>
    <div class="my-n2">
      <button class="btn px-1 mr-1" @click="onClickEdit">
        <fa icon="edit" class="edit-icon"></fa>
      </button>
      <button class="btn px-1" @click="onClickRemove">
        <fa icon="trash" class="trash-icon"></fa>
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/models/todo";
import { FontAwesomeIcon } from "@/plugins/font-awesome";

export type HandleToggleCompleted = (todo: Todo) => void;
export type HandleClickEdit = (todoId: string) => void;
export type HandleClickRemove = (todo: Todo) => void;

export default defineComponent({
  components: { fa: FontAwesomeIcon },

  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
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
    }
  },

  setup(props) {
    const onToggleCompleted = () => {
      props.handleToggleCompleted(props.todo);
    };
    const onClickEdit = () => {
      props.handleClickEdit(props.todo.id);
    };
    const onClickRemove = () => {
      props.handleClickRemove(props.todo);
    };

    return {
      onToggleCompleted,
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
