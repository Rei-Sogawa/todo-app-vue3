<template>
  <li class="list-group-item cleafix">
    <input
      type="checkbox"
      class="mr-3"
      :checked="todo.completed"
      @change="onToggleChecked"
    />
    <span>{{ todo.title }}</span>
    <span class="float-right">
      <button class="btn py-0 px-1 mr-1" @click="onClickEdit">
        <fa icon="edit" class="edit-icon my-0"></fa>
      </button>
      <button class="btn py-0 px-1" @click="onClickRemove">
        <fa icon="trash" class="trash-icon my-0"></fa>
      </button>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/models/todo";
import { FontAwesomeIcon } from "@/plugins/font-awesome";

export default defineComponent({
  name: "TodoItem",

  components: { fa: FontAwesomeIcon },

  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  setup(props, context) {
    const onToggleChecked = () => {
      context.emit("toggle-completed", {
        todo: Object.assign({}, props.todo, {
          completed: !props.todo.completed
        })
      });
    };
    const onClickEdit = () => {
      context.emit("click-edit", { todo: props.todo });
    };
    const onClickRemove = () => {
      context.emit("click-remove", { todo: props.todo });
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
