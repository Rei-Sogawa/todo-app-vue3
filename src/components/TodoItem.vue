<template>
  <li class="list-group-item d-flex justify-content-between">
    <div>
      <input
        type="checkbox"
        class="mr-3"
        required
        :checked="todo.completed"
        @change="handleToggleCompleted(todo)"
      />
      <span>{{ todo.title }}</span>
    </div>
    <div class="my-n2">
      <button class="btn px-1 mr-1" @click="handleClickEdit(todo)">
        <fa icon="edit" class="edit-icon"></fa>
      </button>
      <button class="btn px-1" @click="handleClickRemove(todo)">
        <fa icon="trash" class="trash-icon"></fa>
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@/plugins/font-awesome";
import Todo from "@/models/todo";

export type HandleToggleCompleted = (todo: Todo) => void;
export type HandleClickEdit = (todo: Todo) => void;
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
