<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <path fill="currentColor" :d="svgPath" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import {
  findIconDefinition,
  IconName
} from "@fortawesome/fontawesome-svg-core";

export default defineComponent({
  name: "FontAwesomeIcon",

  props: {
    icon: {
      type: String as PropType<IconName>,
      required: true
    },
    type: {
      type: String as PropType<"fas" | "fal" | "far">,
      default: "fas"
    },
    className: String
  },

  setup(props) {
    const definition = computed(() =>
      findIconDefinition({
        prefix: props.type,
        iconName: props.icon
      })
    );

    const width = computed(() => definition.value.icon[0]);
    const height = computed(() => definition.value.icon[1]);
    const svgPath = computed(() => definition.value.icon[4]);

    return { width, height, svgPath };
  }
});
</script>
