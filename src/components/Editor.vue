<template>
  <codemirror v-model="code" :options="editorOptions">
  </codemirror>
</template>

<script>
import { codemirror } from "vue-codemirror-lite";
import "codemirror/mode/javascript/javascript";

export default {
  data() {
    return {};
  },
  computed: {
    editorOptions() {
      return {
        readOnly: !this.$store.state.isEditing,
        mode: "javascript",
        tabSize: 2,
        lineNumbers: true,
        line: true,
        foldGutter: true
      };
    },
    code: {
      get() {
        return this.$store.state.transitions[this.$store.state.current];
      },
      set(code) {
        this.$store.commit("updateSource", code);
      }
    }
  },
  components: {
    codemirror
  }
};
</script>

<style module>

</style>
